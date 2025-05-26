import React, { useEffect, useState, useRef } from "react";
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
    const ziseRef = useRef();
    const stockRef = useRef();
    const minStockRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const [form, setForm] = useState({
        color_id: "",
        zise_id: "",
        stock: "",
        min_stock: "",
        price: "",
        discount: "",
        final_price: ""
    });

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

    const handleChange = (e) => {
        // Para Select2, e.target puede ser undefined, usar e.currentTarget
        if (e && e.target && e.target.name) {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    // Sincronizar selects con estado React cuando cambian (Select2)
    useEffect(() => {
        if (colorRef.current) {
            $(colorRef.current).on('change', function () {
                setForm((prev) => ({ ...prev, color_id: colorRef.current.value }));
            });
        }
        if (ziseRef.current) {
            $(ziseRef.current).on('change', function () {
                setForm((prev) => ({ ...prev, zise_id: ziseRef.current.value }));
            });
        }
        // Cleanup
        return () => {
            if (colorRef.current) $(colorRef.current).off('change');
            if (ziseRef.current) $(ziseRef.current).off('change');
        };
    }, []);

    const handleEdit = (index) => {
        setEditingIndex(index);
        setForm({ ...variants[index] });
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
        // Leer valores actuales de los refs para asegurar que el estado está sincronizado
        const color_id = colorRef.current ? colorRef.current.value : form.color_id;
        const zise_id = ziseRef.current ? ziseRef.current.value : form.zise_id;
        const stock = stockRef.current ? stockRef.current.value : form.stock;
        const min_stock = minStockRef.current ? minStockRef.current.value : form.min_stock;
        const price = priceRef.current ? priceRef.current.value : form.price;
        const discount = discountRef.current ? discountRef.current.value : form.discount;
        // Validación robusta: no vacío, no null, no string vacío, no solo espacios
        const isEmpty = (val) => val === undefined || val === null || String(val).trim() === '';
        if (isEmpty(color_id) || isEmpty(zise_id) || isEmpty(stock) || isEmpty(price)) {
            alert("Completa todos los campos obligatorios: Color, Talla, Stock y Precio.");
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
            setForm({ color_id: "", zise_id: "", stock: "", min_stock: "", price: "", discount: "", final_price: "" });
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
                value={form.color_id}
                onChange={handleChange}
                required
                dropdownParent="#item-variants-form"
                eRef={colorRef}
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
                value={form.zise_id}
                onChange={handleChange}
                dropdownParent="#item-variants-form"
                eRef={ziseRef}
            >
                        <option value="">Seleccionar</option>
                        {sizes.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </SelectFormGroup>
                </div>
                <div className="col-md-2">
                    <InputFormGroup label="Stock" name="stock" value={form.stock} onChange={handleChange} type="number" min={0} required eRef={stockRef} />
                </div>
                <div className="col-md-1">
                    <InputFormGroup label="Min. Stock" name="min_stock" value={form.min_stock} onChange={handleChange} type="number" min={0} eRef={minStockRef} />
                </div>
                <div className="col-md-2">
                    <InputFormGroup label="Precio" name="price" value={form.price} onChange={handleChange} type="number" step="0.01" eRef={priceRef} />
                </div>
                <div className="col-md-1">
                    <InputFormGroup label="Descuento" name="discount" value={form.discount} onChange={handleChange} type="number" step="0.01" eRef={discountRef} />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                    <button className="btn btn-primary w-100" type="button" onClick={handleSave}>
                        {editingIndex !== null ? "Actualizar" : "Agregar"}
                    </button>
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
