import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import InputFormGroup from '../Components/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';
import SelectFormGroup from '../Components/form/SelectFormGroup';
import Swal from 'sweetalert2';
import PostsRest from '../Actions/Admin/PostsRest';
import QuillFormGroup from '../Components/Adminto/form/QuillFormGroup';
import SelectAPIFormGroup from '../Components/Adminto/form/SelectAPIFormGroup';
import html2string from '../Utils/html2string';
import SetSelectValue from '../Utils/SetSelectValue';

const postsRest = new PostsRest()

const Posts = ({ }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const slugRef = useRef()
  const categoryRef = useRef()
  const descriptionRef = useRef()
  const tagsRef = useRef()
  const imageRef = useRef()
  const postDateRef = useRef()
  const metaTitleRef = useRef()
  const metaDescriptionRef = useRef()
  const metaKeywordsRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    slugRef.current.value = data?.slug ?? ''
    SetSelectValue(categoryRef.current, data?.category?.id, data?.category?.name);
    descriptionRef.editor.root.innerHTML = data?.description ?? ''
    imageRef.image.src = `/api/posts/media/${data?.image}`
    imageRef.current.value = null
    SetSelectValue(tagsRef.current, data?.tags ?? [], 'id', 'name')
    postDateRef.current.value = data?.post_date ?? moment().format('YYYY-MM-DD')
    metaTitleRef.current.value = data?.meta_title ?? ''
    metaDescriptionRef.current.value = data?.meta_description ?? ''
    metaKeywordsRef.current.value = data?.meta_keywords ?? ''

    $(modalRef.current).modal('show')
  }

  const handleNameChange = (e) => {
    if (!isEditing || !slugRef.current.value) {
      const slugVal = e.target.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      slugRef.current.value = slugVal
    }
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      slug: slugRef.current.value,
      category_id: categoryRef.current.value,
      summary: html2string(descriptionRef.current.value),
      description: descriptionRef.current.value,
      tags: $(tagsRef.current).val(),
      post_date: postDateRef.current.value,
      meta_title: metaTitleRef.current.value,
      meta_description: metaDescriptionRef.current.value,
      meta_keywords: metaKeywordsRef.current.value
    }

    const formData = new FormData()
    for (const key in request) {
      formData.append(key, request[key] ?? '')
    }
    const file = imageRef.current.files[0]
    if (file) {
      formData.append('image', file)
    }

    const result = await postsRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await postsRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar registro',
      text: '¿Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await postsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Posts' rest={postsRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            text: 'Nuevo registro',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'category.name',
          caption: 'Categoría',
        },
        {
          dataField: 'name',
          caption: 'Título / URL Amigable',
          cellTemplate: (container, {data}) => {
            const articleUrl = `/blog/${data.slug || data.id}`
            ReactAppend(container, <>
              <strong>{data.name}</strong>
              <div className='mt-1'>
                <a href={articleUrl} target='_blank' rel='noreferrer' className='text-primary fs-12 text-decoration-none'>
                  <i className='fa fa-external-link-alt me-1'></i>/{data.slug || data.id}
                </a>
              </div>
              <div className='mt-1'>
                {data.tags?.map((tag, index) => <span key={index} className='badge badge-soft-success me-1'>{tag.name}</span>)}
              </div>
            </>)
          }
        },
        {
          dataField: 'image',
          caption: 'Imagen',
          width: '90px',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <img src={`/api/posts/media/${data.image}`} style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} onError={e => e.target.src = '/api/cover/thumbnail/null'} />)
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar post' : 'Agregar post'} onSubmit={onModalSubmit} size='lg'>
      <div className='row' id='posts-container'>
        <input ref={idRef} type='hidden' />

        <ImageFormGroup eRef={imageRef} label='Imagen principal' />
        <SelectAPIFormGroup eRef={categoryRef} searchAPI='/api/admin/categoriespost/paginate' searchBy='name' label='Categoría' required dropdownParent='#posts-container' />
        <div className='col-12'>
          <label className='form-label'>Título <span className='text-danger'>*</span></label>
          <input ref={nameRef} type='text' className='form-control mb-3' placeholder='Título del post' required onChange={handleNameChange} />
        </div>
        <QuillFormGroup eRef={descriptionRef} label='Contenido' />
        <SelectAPIFormGroup id='tags' eRef={tagsRef} searchAPI={'/api/admin/tags/paginate'} searchBy='name' label='Tags' dropdownParent='#posts-container' tags multiple/>
        <InputFormGroup eRef={postDateRef} label='Fecha de publicación' type='date' required />

        {/* Sección de Optimización SEO y URL amigable */}
        <div className='col-12'>
          <hr className='my-3' />
          <h5 className='text-uppercase fs-13 text-primary mb-2'>
            <i className='fa fa-globe me-1'></i> Optimización SEO y Enlace Amigable
          </h5>
        </div>

        <div className='col-12 mb-3'>
          <label className='form-label'>URL Amigable (Slug)</label>
          <div className='input-group'>
            <span className='input-group-text bg-light'>/blog/</span>
            <input ref={slugRef} type='text' className='form-control' placeholder='enlace-amigable-del-articulo' />
          </div>
          <small className='text-muted'>Identificador de la URL. Si lo dejas vacío, se autogenerará a partir del título.</small>
        </div>

        <div className='col-12 mb-3'>
          <label className='form-label'>Meta Title (Título SEO para Google)</label>
          <input ref={metaTitleRef} type='text' className='form-control' placeholder='Título persuasivo para Google (máx. 60 caracteres)' maxLength={70} />
          <small className='text-muted'>Si no lo completas, se usará el título del artículo con el nombre de la empresa.</small>
        </div>

        <div className='col-12 mb-3'>
          <label className='form-label'>Meta Description (Descripción SEO)</label>
          <textarea ref={metaDescriptionRef} className='form-control' rows={2} placeholder='Descripción atractiva para resultados de búsqueda (máx. 155 caracteres)' maxLength={165}></textarea>
          <small className='text-muted'>Si no lo completas, se usará el resumen generado del contenido.</small>
        </div>

        <div className='col-12 mb-3'>
          <label className='form-label'>Meta Keywords (Palabras clave)</label>
          <input ref={metaKeywordsRef} type='text' className='form-control' placeholder='intercomunicadores, seguridad edificios, videoporteros lima' />
        </div>
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Posts'>
    <Posts {...properties} />
  </BaseAdminto>);
})