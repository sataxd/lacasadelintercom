import React, { useEffect, useRef, useState } from "react";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
// Elimina DxButton, usa botones nativos para evitar error de React
import Swal from "sweetalert2";
import { Cookies } from "sode-extend-react";

const ItemVariants = ({ itemId, colors, sizes }) => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

     const colorRef = useRef();
      const sizeRef = useRef();
    // Eliminados los refs, todo será controlado por estado
    const color_idRef = useRef();
    const zise_idRef = useRef();
    const stockRef = useRef();
    const min_stockRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const final_priceRef = useRef();

    useEffect(() => {
        if (!itemId) return;
        setLoading(true);
        fetch(`/api/item-variants/by-item/${itemId}`)
            .then((res) => res.json())
            .then((res) => {
                setVariants(res.data || []);
                setLoading(false);
            });
    }, [itemId]);

    // No se necesita handleChange, los valores se leen directamente de los refs

    // Eliminado el useEffect de sincronización con refs y jQuery

    const handleEdit = (index) => {
        setEditingIndex(index);
        // Actualizar los refs con los valores de la variante a editar
        const v = variants[index];
        if (color_idRef.current) {
            color_idRef.current.value = v.color_id || "";
            // Forzar actualización visual de select2
            window.$ && window.$(color_idRef.current).val(v.color_id || "").trigger('change.select2');
        }
        if (zise_idRef.current) {
            zise_idRef.current.value = v.zise_id || "";
            window.$ && window.$(zise_idRef.current).val(v.zise_id || "").trigger('change.select2');
        }
        if (stockRef.current) stockRef.current.value = v.stock || "";
        if (min_stockRef.current) min_stockRef.current.value = v.min_stock || "";
        if (priceRef.current) priceRef.current.value = v.price || "";
        if (discountRef.current) discountRef.current.value = v.discount || "";
        if (final_priceRef.current) final_priceRef.current.value = v.final_price || "";
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        resetForm();
    };

    // Función para resetear el formulario
    const resetForm = () => {
        if (color_idRef.current) color_idRef.current.value = "";
        if (zise_idRef.current) zise_idRef.current.value = "";
        if (stockRef.current) stockRef.current.value = "";
        if (min_stockRef.current) min_stockRef.current.value = "";
        if (priceRef.current) priceRef.current.value = "";
        if (discountRef.current) discountRef.current.value = "";
        if (final_priceRef.current) final_priceRef.current.value = "";
    };

    const handleDelete = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar variante",
            text: "¿Estás seguro de eliminar esta variante?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        await fetch(`/api/item-variants/${id}`, { method: "DELETE" });
        setVariants((prev) => prev.filter((v) => v.id !== id));
    };

    const handleSave = async (e) => {
        e.preventDefault && e.preventDefault();
        // Leer valores de los refs
        const color_id = color_idRef.current ? color_idRef.current.value : "";
        const zise_id = zise_idRef.current ? zise_idRef.current.value : "";
        const stock = stockRef.current ? stockRef.current.value : "";
        const min_stock = min_stockRef.current ? min_stockRef.current.value : "";
        const price = priceRef.current ? priceRef.current.value : "";
        const discount = discountRef.current ? discountRef.current.value : "";
        // Validación robusta: no vacío, no null, no string vacío, no solo espacios
        const isEmpty = (val) => val === undefined || val === null || String(val).trim() === '';
        if ( isEmpty(stock) || isEmpty(price)) {
            alert("Completa todos los campos obligatorios: Stock y Precio.");
            return;
        }
        let final_price = price;
        if (discount && parseFloat(discount) > 0) {
            final_price = discount;
        }
        const payload = {
            color_id,
            zise_id,
            stock,
            min_stock,
            price,
            discount,
            final_price,
            item_id: itemId
        };
        // Si estamos editando, incluir el ID de la variante
        if (editingIndex !== null) {
            payload.id = variants[editingIndex].id;
        }
        const res = await fetch(`/api/item-variants/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Xsrf-Token": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
            },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.status === 200) {
            if (editingIndex !== null) {
                setVariants((prev) => prev.map((v, i) => (i === editingIndex ? data.data : v)));
            } else {
                setVariants((prev) => [...prev, data.data]);
            }
            resetForm();
            setEditingIndex(null);
        }
    };

    return (
        <div>
            <h5>Variantes (Color + Talla)</h5>
            <div className="row g-2 align-items-center" id="item-variants-form" style={{ alignItems: "center" }}>
                <div className="col-md-2">
                    <SelectFormGroup
                        label="Color"
                        name="color_id"
                        eRef={color_idRef}
                        required
                        dropdownParent="#item-variants-form"
                    >
                        <option value="">Seleccionar</option>
                        {colors.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </SelectFormGroup>
                </div>
                <div className="col-md-2">
                    <SelectFormGroup
                        label="Talla"
                        name="zise_id"
                        eRef={zise_idRef}
                        dropdownParent="#item-variants-form"
                    >
                        <option value="">Seleccionar</option>
                        {sizes.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </SelectFormGroup>
                </div>
                <div className="col-md-2">
                    <InputFormGroup label="Stock" name="stock" eRef={stockRef} type="number" min={0} required />
                </div>
                <div className="col-md-1">
                    <InputFormGroup label="Min. Stock" name="min_stock" eRef={min_stockRef} type="number" min={0} />
                </div>
                <div className="col-md-2">
                    <InputFormGroup label="Precio" name="price" eRef={priceRef} type="number" step="0.01" />
                </div>
                <div className="col-md-1">
                    <InputFormGroup label="Descuento" name="discount" eRef={discountRef} type="number" step="0.01" />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                    <button className="btn btn-primary me-1" type="button" onClick={handleSave}>
                        {editingIndex !== null ? "Actualizar" : "Agregar"}
                    </button>
                    {editingIndex !== null && (
                        <button className="btn btn-light" type="button" onClick={cancelEdit}>
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
            <hr />
            <table className="table table-bordered table-sm mt-2">
                <thead>
                    <tr>
                        <th>Color</th>
                        <th>Talla</th>
                        <th>Stock</th>
                        <th>Min. Stock</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Final</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {variants.map((v, i) => (
                        <tr key={v.id}>
                            <td>{v.color?.name || "-"}</td>
                            <td>{v.zise?.name || "-"}</td>
                            <td>{v.stock}</td>
                            <td>{v.min_stock}</td>
                            <td>{v.price}</td>
                            <td>{v.discount}</td>
                            <td>{v.final_price}</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-soft-primary me-1"
                                    title="Editar"
                                    onClick={() => handleEdit(i)}
                                >
                                    <i className="fa fa-pen"></i>
                                </button>
                                <button
                                    className="btn btn-xs btn-soft-danger"
                                    title="Eliminar"
                                    onClick={() => handleDelete(v.id)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemVariants;
