
let carrito = [];

const rutaImagenes = "img/";

let productos = [
  {
    id: 1,
    nombre: "Guajalota Verde",
    descripcion: "Sabrosa guajalota para su deguste bucal",
    precio: 80000,
    imagen: "g-verde.png",
    categoria: "Guajalotas"
  },

  {
    id: 2,
    nombre: "Guajalota de Mole",
    descripcion: "Hermosa y rica guajalota para que la acompañes con un jugo de Guanábana",
    precio: 70000,
    imagen: "G-MOLE.png",
    categoria: "Guajalotas"
  },

  {
    id: 3,
    nombre: "Guajalota de Guayaba",
    descripcion: "Deliciosa guajalota de guayaba para el deguste humanitario",
    precio: 50000,
    imagen: "G-GUAYABA.png",
    categoria: "Guajalotas"
  },

  {
    id: 4,
    nombre: "Guajalota de Piña",
    descripcion: "Deliciosa guajalota de piña 100% NATURAL 0 conservantes artifisiales creanme",
    precio: 90000,
    imagen: "G-PIÑA.png",
    categoria: "Guajalotas"

  },

  {
    id: 5,
    nombre: "Guajalota de Pasas",
    descripcion: "Rica guajalota cosechada de los mejores cultivadores agropecuarios de la zona",
    precio: 30000,
    imagen: "G-PASAS.png",
    categoria: "Guajalotas"
  },

  {
    id: 6,
    nombre: "Champurrado",
    descripcion: "Champurrado sabor insaboro.",
    precio: 5000,
    imagen: "B-CHAMPURRADO.png",
    categoria: "Bebidas"
  },

  {
    id: 7,
    nombre: "Atole de Arroz con Leche",
    descripcion: "Arroz con leche bien sabroso",
    precio: 5000,
    imagen: "B-ARROZ-CON-LECHE.png",
    categoria: "Bebidas"
  },

  {
    id: 8,
    nombre: "Chocolate Caliente",
    descripcion: "Chocolate traido de wakanda, mejor dicho supreme",
    precio: 5000,
    imagen: "B-CHAMPURRADO.png",
    categoria: "Bebidas"
  },

  {
    id: 9,
    nombre: "Cafe Negro",
    descripcion: "Cafe negro sin azucar",
    precio: 5000,
    imagen: "B-CHAMPURRADO.png",
    categoria: "Bebidas"
  },

  {
    id: 10,
    nombre: "Tamal Verde",
    descripcion: "Tamal Verde.",
    precio: 50000,
    imagen: "T-VERDE.png",
    categoria: "Tamales"
  },

  {
    id: 11,
    nombre: "Tamal de Mole",
    descripcion: "Tamal molido, de carne molida",
    precio: 50000,
    imagen: "T-MOLE.png",
    categoria: "Tamales"
  },

  {
    id: 12,
    nombre: "Tamal de Guayaba",
    descripcion: "Tamal con un toque de salsa de guayaba",
    precio: 50000,
    imagen: "TD-GUAYABA.png",
    categoria: "Tamales"
  },

  {
    id: 13,
    nombre: "Tamal de Piña",
    descripcion: "Tamal de piña con piñas cultivadas en las tierras de marte. Se puede decir que su sabor es de otro planeta",
    precio: 50000,
    imagen: "TD-PIÑA.png",
    categoria: "Tamales"
  },

  {
    id: 14,
    nombre: "Tamal de Pasas",
    descripcion: "Tamal con trozos de pasas",
    precio: 50000,
    imagen: "TD-PASAS.png",
    categoria: "Tamales"
  },



];

function pagarConTarjeta() {
  const dialogoFormaPago = document.getElementById("dialogoFormaPago");
  dialogoFormaPago.close();

  mostrarPagoTarjeta();
}


function mostrarPagoTarjeta() {
  ocultarSecciones();
  document.getElementById("pago-section").style.display = "block";
  document.getElementById("pago-tarjeta").style.display = "block";
}

function cerrarDialogoFormaPago() {
  const dialogoFormaPago = document.getElementById("dialogoFormaPago");
  dialogoFormaPago.close();
}

document.getElementById("boton-vaciar-carrito").addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  const confirmacion = confirm("¿Está seguro de que desea vaciar el carrito?");
  if (confirmacion) {
    carrito = [];
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const enlacesProductosNav = document.querySelectorAll(".productos-nav a");

  enlacesProductosNav.forEach((enlace) => {
    enlace.addEventListener("click", (event) => {
      event.preventDefault();

      enlacesProductosNav.forEach((e) => e.classList.remove("active"));
      enlace.classList.add("active");

      const seccionId = enlace.getAttribute("href").substring(1);
      mostrarProductosPorCategoria(seccionId);
    });
  });
});

function mostrarProductosPorCategoria(categoria) {
  ocultarSecciones();
  document.getElementById("productos-section").style.display = "block";

  const contenedorProductos = document.getElementById("productos-container");
  contenedorProductos.innerHTML = "";

  const productosFiltrados = productos.filter((producto) => producto.categoria === categoria);

  if (productosFiltrados.length > 0) {
    productosFiltrados.forEach((producto) => {
      const productoElemento = document.createElement("article");
      productoElemento.classList.add("card");

      const contenidoProducto = `
            <div class="card-header">
                ${producto.nombre}
            </div>
            <div class="card-body">
              <img src="${rutaImagenes}${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;

      productoElemento.innerHTML = contenidoProducto;
      contenedorProductos.appendChild(productoElemento);
    });
  } else {
    contenedorProductos.innerHTML = "<p>No se encontraron productos en esta categoría.</p>";
  }
}

const searchBar = document.getElementById("Search");
searchBar.addEventListener("input", buscarProductoPorNombre);
searchBar.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buscarProductoPorNombre();
  }
});


document.getElementById("Search").addEventListener("input", buscarProductoPorNombre);

function buscarProductoPorNombre() {
  const textoBusqueda = document.getElementById("Search").value.toLowerCase();

  const productoEncontrado = productos.find((producto) => {
    const nombreProducto = producto.nombre.toLowerCase();
    return nombreProducto.includes(textoBusqueda);
  });

  if (productoEncontrado) {
    mostrarProductos([productoEncontrado]);
  } else {
    ocultarSecciones();
    document.getElementById("productos-section").style.display = "block";
    const contenedorProductos = document.getElementById("productos-container");
    contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
  }
}



function mostrarProductos() {
  ocultarSecciones();
  document.getElementById("productos-section").style.display = "block";

  const contenedorProductos = document.getElementById("productos-container");
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const productoElemento = document.createElement("article");
    productoElemento.classList.add("card");

    const contenidoProducto = `
            <div class="card-header">
                ${producto.nombre}
            </div>
            <div class="card-body">
            <img src="${rutaImagenes}${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;

    productoElemento.innerHTML = contenidoProducto;
    contenedorProductos.appendChild(productoElemento);
  });
}

function agregarAlCarrito(productoId) {
  const productoEncontrado = productos.find((producto) => producto.id === productoId);
  if (productoEncontrado) {
    carrito.push(productoEncontrado);
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  ocultarSecciones();
  document.getElementById("carrito-section").style.display = "block";

  const carritoLista = document.getElementById("carrito-lista");
  carritoLista.innerHTML = "";
  let totalCarrito = 0;

  carrito.forEach((producto) => {
    const carritoElemento = document.createElement("li");
    carritoElemento.innerHTML = `
        <img src="${rutaImagenes}${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <span>${producto.nombre}</span> - $${producto.precio}
            
        `;
    carritoLista.appendChild(carritoElemento);
    totalCarrito += producto.precio;
  });

  const totalCarritoElemento = document.getElementById("total-carrito");
  totalCarritoElemento.textContent = totalCarrito;
}

function mostrarPagoSectionDesdeCarrito() {
  ocultarSecciones();
  document.getElementById("pago-section").style.display = "block";
}

function guardarInformacionPago() {
  const nombreTitular = document.getElementById("nombre-titular").value;
  const numeroTarjeta = document.getElementById("numero-tarjeta").value;
  const fechaExpiracion = document.getElementById("fecha-expiracion").value;
  const codigoSeguridad = document.getElementById("codigo-seguridad").value;
  const direccionEnvio = document.getElementById("direccion-envio").value;

  if (nombreTitular && numeroTarjeta && fechaExpiracion && codigoSeguridad) {
    const informacionPago = {
      nombreTitular,
      numeroTarjeta,
      fechaExpiracion,
      codigoSeguridad,
      direccionEnvio,
    };

    localStorage.setItem("informacionPago", JSON.stringify(informacionPago));
    alert("Pago realizado con éxito.");
  } else {
    alert("Por favor, complete todos los campos para completar el pago.");
  }
}

document.getElementById("boton-realizar-pago-carrito").addEventListener("click", mostrarPagoSectionDesdeCarrito);

document.getElementById("boton-realizar-pago-pago").addEventListener("click", guardarInformacionPago);

document.getElementById("in-pr").addEventListener("click", mostrarProductos)

function ocultarSecciones() {
  document.getElementById("inicio-section").style.display = "none";
  document.getElementById("productos-section").style.display = "none";
  document.getElementById("carrito-section").style.display = "none";
  document.getElementById("pago-section").style.display = "none";
}

window.addEventListener("hashchange", handleRouteChange);

function handleRouteChange() {
  const hash = window.location.hash;
  if (hash === "#inicio") {
    ocultarSecciones();
    document.getElementById("inicio-section").style.display = "block";
  } else if (hash === "#productos") {
    mostrarProductos();
  } else if (hash === "#carrito") {
    mostrarCarrito();
  } else if (hash === "#pago") {
    ocultarSecciones();
    document.getElementById("pago-section").style.display = "block";
  } else {
    ocultarSecciones();
    document.getElementById("inicio-section").style.display = "block";
  }
}

handleRouteChange();

function agregarAlCarrito(productoId) {
  const productoEncontrado = productos.find((producto) => producto.id === productoId);
  if (productoEncontrado) {
    carrito.push(productoEncontrado);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  }
}
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


window.addEventListener("load", () => {
  cargarCarritoDesdeLocalStorage();
  handleRouteChange();


  function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
    }
  }
});

