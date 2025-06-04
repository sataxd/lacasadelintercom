import React, { createContext, useState, useEffect, useRef } from "react";
import { Local } from "sode-extend-react";
import ItemsRest from "../actions/ItemRest";
import { i } from "framer-motion/client";
import AlertComponent from "./AlertComponent";

export const CarritoContext = createContext();
const itemsRest = new ItemsRest();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const data = localStorage.getItem("carrito");

        return data ? JSON.parse(data) : [];
    });
    //console.log("data", carrito);
    const [alerta, setAlerta] = useState(null);
    const timeoutRef = useRef(null);
    // Función para obtener precios actualizados desde la API
    const actualizarPrecios = async () => {
        try {
            if (carrito.length === 0) return; // Evitar llamadas innecesarias
            
            // Preparar payload correcto para verifyStock
            const payload = carrito.flatMap(producto => {
                if (producto.variations && producto.variations.length > 0) {
                    // Producto con variaciones - crear un item por cada variación
                    return producto.variations.map(variation => ({
                        id: producto.id,
                        quantity: variation.quantity,
                        color: variation.color || null,
                        size: variation.size || null,
                    }));
                } else {
                    // Producto sin variaciones
                    return [{
                        id: producto.id,
                        quantity: producto.quantity,
                        color: null,
                        size: null,
                    }];
                }
            });
            
            itemsRest.verifyStock(payload).then((items) => {
                const newCart = carrito.map((producto) => {
                    if (producto.variations && producto.variations.length > 0) {
                        // Producto con variaciones - actualizar precio de cada variación
                        const updatedVariations = producto.variations.map(variation => {
                            // Buscar el item específico que corresponde a esta variación
                            const found = items.find((item) => 
                                item.id === producto.id && 
                                item.color === variation.color && 
                                item.size === variation.size
                            );
                            
                            if (found) {
                                return {
                                    ...variation,
                                    price: found.price,
                                    final_price: found.final_price,
                                    discount: found.discount,
                                };
                            }
                            return variation;
                        });
                        
                        // Para el producto principal, usamos los datos del primer item encontrado
                        const firstFound = items.find((item) => item.id === producto.id);
                        
                        return {
                            ...producto,
                            variations: updatedVariations,
                            price: firstFound ? firstFound.price : producto.price,
                            final_price: firstFound ? firstFound.final_price : producto.final_price,
                            discount: firstFound ? firstFound.discount : producto.discount,
                            name: firstFound ? firstFound.name : producto.name,
                        };
                    } else {
                        // Producto sin variaciones - buscar directamente
                        const found = items.find((item) => 
                            item.id === producto.id && 
                            !item.color && 
                            !item.size
                        );
                        
                        return found
                            ? {
                                  ...producto,
                                  price: found.price,
                                  final_price: found.final_price,
                                  discount: found.discount,
                                  name: found.name,
                              }
                            : producto;
                    }
                });
                setCarrito(newCart);
            });
        } catch (error) {
            console.error("Error al actualizar precios:", error);
        }
    };

    // Cargar carrito desde localStorage y actualizar precios al iniciar
    useEffect(() => {
        actualizarPrecios();
        // console.log("estoy actualizando");
    }, []);

    // Guardar cambios en LocalStorage
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //localStorage.clear();
        //setCarrito([]);
    }, [carrito]);

    // Mostrar alerta después de un tiempo
    useEffect(() => {
        if (carrito.length > 0) {
            // Configurar un temporizador para mostrar la primera alerta después de 1 minuto
            const primerAlerta = setTimeout(() => {
                setAlerta({
                    message: "¡No olvides completar tu compra! 😉",
                    actionLabel: "Ver carrito",
                    onAction: () => console.log("Ir al carrito"),
                    duration: 5000,
                });

                // Luego configurar un intervalo para repetir la alerta cada 30 segundos
                const intervalo = setInterval(() => {
                    setAlerta({
                        message: "¡No olvides completar tu compra! 😉",
                        actionLabel: "Ver carrito",
                        onAction: () => console.log("Ir al carrito"),
                        duration: 5000,
                    });
                }, 30000);

                // Limpiar el intervalo al desmontar o cuando el carrito se vacía
                return () => clearInterval(intervalo);
            }, 60000); // Espera de 1 minuto

            // Limpiar el primer temporizador si se vacía el carrito o se desmonta el componente
            return () => clearTimeout(primerAlerta);
        } else {
            setAlerta(null);
        }
    }, [carrito]);

    // Función para agregar productos con validación de stock
    const agregarAlCarrito = async (producto) => {
        // Preparar payload para verificar stock
        const payload = [];
        
        // Detectar si el producto tiene variantes (más flexible)
        const hasColors = (producto.colors && producto.colors.length > 0) || producto.selectedColor;
        const hasSizes = (producto.sizes && producto.sizes.length > 0) || producto.selectedSize;
        const hasVariants = hasColors || hasSizes;
        
        if (hasVariants) {
            // Producto con variaciones
            payload.push({
                id: producto.id,
                quantity: producto.quantity,
                color: producto.selectedColor || null,
                size: producto.selectedSize || null,
            });
        } else {
            // Producto sin variaciones
            payload.push({
                id: producto.id,
                quantity: producto.quantity,
                color: null,
                size: null,
            });
        }

        const stockResult = await itemsRest.verifyStock(payload);
        
        const stockInfo = stockResult[0];
        if (!stockInfo || !stockInfo.available) {
            setAlerta({
                id: Date.now(),
                message: `No hay stock suficiente para "${producto.name}"${stockInfo && stockInfo.color ? ` (${stockInfo.color}${stockInfo.size ? ' - ' + stockInfo.size : ''})` : ''}.`,
                actionLabel: "Ver productos",
                duration: 5000,
            });
            return { success: false, message: `No hay stock suficiente para "${producto.name}"` };
        }

        setCarrito((prev) => {
            // Usar la misma lógica de detección de variantes
            const hasColors = (producto.colors && producto.colors.length > 0) || producto.selectedColor;
            const hasSizes = (producto.sizes && producto.sizes.length > 0) || producto.selectedSize;
            const tieneVariaciones = hasColors || hasSizes;

            if (!tieneVariaciones) {
                // Producto sin variaciones
                const existe = prev.find((p) => p.id === producto.id);

                if (existe) {
                    return prev.map((p) =>
                        p.id === producto.id
                            ? { ...p, quantity: p.quantity + producto.quantity }
                            : p
                    );
                }

                return [
                    ...prev,
                    {
                        ...producto,
                        variations: [],
                        quantity: producto.quantity,
                    },
                ];
            }

            // Producto con variaciones
            const newVariation = {
                color: producto.selectedColor || null,
                size: producto.selectedSize || null,
                quantity: producto.quantity,
            };

            const productoExistenteIndex = prev.findIndex(
                (p) => p.id === producto.id
            );

            if (productoExistenteIndex >= 0) {
                const newCarrito = [...prev];
                const productoExistente = newCarrito[productoExistenteIndex];

                const variacionExistenteIndex =
                    productoExistente.variations?.findIndex(
                        (v) =>
                            v.color === newVariation.color &&
                            v.size === newVariation.size
                    ) ?? -1;

                if (variacionExistenteIndex >= 0) {
                    newCarrito[productoExistenteIndex] = {
                        ...productoExistente,
                        variations: productoExistente.variations.map(
                            (v, index) =>
                                index === variacionExistenteIndex
                                    ? {
                                          ...v,
                                          quantity:
                                              v.quantity +
                                              newVariation.quantity,
                                      }
                                    : v
                        ),
                    };
                } else {
                    newCarrito[productoExistenteIndex] = {
                        ...productoExistente,
                        variations: [
                            ...productoExistente.variations,
                            newVariation,
                        ],
                    };
                }

                return newCarrito;
            } else {
                return [
                    ...prev,
                    {
                        ...producto,
                        variations: [newVariation],
                        quantity: producto.quantity,
                    },
                ];
            }
        });
        
        console.log('🛒 DEBUG - Product added to cart successfully');
        setAlerta({
            id: Date.now(),
            message: "Se ha agregado el artículo al carrito",
            actionLabel: "Ver carrito",
            duration: 5000,
        });
        
        return { success: true };
    };

    // Función para eliminar un producto
    const eliminarProducto = (id) => {
        setCarrito((prev) => prev.filter((p) => p.id !== id));
        setAlerta(null); // Reiniciar alerta cuando se elimina un producto
        // Eliminar flag de ad_shown si corresponde (para volver a mostrar el modal de Ads)
        localStorage.removeItem(`ad_shown_${id}`);
    };

    // Función para vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
        setAlerta(null); // Reiniciar alerta cuando se elimina un producto
    };

    // Función para incrementar cantidad
    const incrementarCantidad = (id, variation = null) => {
        setCarrito((prev) => {
            return prev.map((item) => {
                // Producto sin variaciones
                if (
                    item.id === id &&
                    (!item.variations || item.variations.length === 0)
                ) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                // Producto con variaciones
                if (
                    item.id === id &&
                    item.variations &&
                    item.variations.length > 0
                ) {
                    // Si no se especifica variación, incrementamos la primera (podrías ajustar esto)
                    if (!variation) {
                        return {
                            ...item,
                            variations: item.variations.map((v, i) =>
                                i === 0 ? { ...v, quantity: v.quantity + 1 } : v
                            ),
                        };
                    }

                    // Incrementar la variación específica
                    return {
                        ...item,
                        variations: item.variations.map((v) =>
                            v.color === variation.color &&
                            v.size === variation.size
                                ? { ...v, quantity: v.quantity + 1 }
                                : v
                        ),
                    };
                }

                return item;
            });
        });
    };

    // Función para decrementar cantidad
    const decrementarCantidad = (id, variation = null) => {
        setCarrito((prev) => {
            return prev.map((item) => {
                // Producto sin variaciones
                if (
                    item.id === id &&
                    (!item.variations || item.variations.length === 0)
                ) {
                    return {
                        ...item,
                        quantity: Math.max(1, item.quantity - 1), // No permitir menos de 1
                    };
                }

                // Producto con variaciones
                if (
                    item.id === id &&
                    item.variations &&
                    item.variations.length > 0
                ) {
                    // Si no se especifica variación, decrementamos la primera
                    if (!variation) {
                        const newVariations = item.variations.map((v, i) =>
                            i === 0
                                ? {
                                      ...v,
                                      quantity: Math.max(1, v.quantity - 1),
                                  }
                                : v
                        );

                        return {
                            ...item,
                            variations: newVariations,
                        };
                    }

                    // Decrementar la variación específica
                    const newVariations = item.variations.map((v) =>
                        v.color === variation.color && v.size === variation.size
                            ? { ...v, quantity: Math.max(1, v.quantity - 1) }
                            : v
                    );

                    return {
                        ...item,
                        variations: newVariations,
                    };
                }

                return item;
            });
        });
    };

    // Función para eliminar producto cuando cantidad llega a 0 (opcional)
    const eliminarSiCero = (id, variation = null) => {
        setCarrito((prev) => {
            // Productos sin variaciones
            if (!variation) {
                return prev.filter(
                    (item) => !(item.id === id && item.quantity === 0)
                );
            }

            // Productos con variaciones
            return prev
                .map((item) => {
                    if (item.id === id && item.variations) {
                        const newVariations = item.variations.filter(
                            (v) =>
                                !(
                                    v.color === variation.color &&
                                    v.size === variation.size &&
                                    v.quantity === 0
                                )
                        );

                        // Si no quedan variaciones, eliminamos el producto
                        if (newVariations.length === 0) {
                            return null;
                        }

                        return {
                            ...item,
                            variations: newVariations,
                        };
                    }
                    return item;
                })
                .filter(Boolean); // Eliminar nulls
        });
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarProducto,
                vaciarCarrito,
                actualizarPrecios,
                decrementarCantidad,
                incrementarCantidad,
                eliminarSiCero,
            }}
        >
            {children}
            {alerta && (
                <AlertComponent {...alerta} onClose={() => setAlerta(null)} />
            )}
        </CarritoContext.Provider>
    );
};
