function actualizarResultados() {
  const compra = parseFloat(document.getElementById('precioCompra').value);
  const venta = parseFloat(document.getElementById('precioVenta').value);
  const capital = parseFloat(document.getElementById('capitalUsd').value);
  const advertencia = document.getElementById('advertencia');

  if (isNaN(compra) || isNaN(venta)) return;

  const brecha = venta - compra;
  const sinComision = ((venta - compra) / compra) * 100;
  const comAnun = ((venta * 0.996) - compra) / compra * 100;
  const comTil = ((venta * 0.9968) - compra) / compra * 100;
  const vip2 = ((venta * 0.9972) - compra) / compra * 100;
  const vip3 = ((venta * 0.998) - compra) / compra * 100;

  document.getElementById('brecha').innerText = brecha.toFixed(2);
  document.getElementById('sinComision').innerText = sinComision.toFixed(2);
  document.getElementById('comAnun').innerText = comAnun.toFixed(2);
  document.getElementById('comTil').innerText = comTil.toFixed(2);
  document.getElementById('vip2').innerText = vip2.toFixed(2);
  document.getElementById('vip3').innerText = vip3.toFixed(2);

  // Mostrar advertencia si hay pérdidas
  if (comAnun < 0 || comTil < 0) {
    advertencia.style.display = "block";
    advertencia.innerText = "⚠️ Atención: En algunos niveles estás obteniendo pérdidas debido a que la comisión es mayor a la ganancia. Revisa los valores ingresados.";
  } else {
    advertencia.style.display = "none";
  }

  if (!isNaN(capital)) {
    const gananciaSin = brecha * capital;
    const gananciaAnun = ((venta * 0.996) - compra) * capital;
    const gananciaTil = ((venta * 0.9968) - compra) * capital;
    const gananciaVip2 = ((venta * 0.9972) - compra) * capital;
    const gananciaVip3 = ((venta * 0.998) - compra) * capital;

    document.getElementById('gananciaSin').innerText = gananciaSin.toFixed(2);
    document.getElementById('gananciaAnun').innerText = gananciaAnun.toFixed(2);
    document.getElementById('gananciaTil').innerText = gananciaTil.toFixed(2);
    document.getElementById('gananciaVip2').innerText = gananciaVip2.toFixed(2);
    document.getElementById('gananciaVip3').innerText = gananciaVip3.toFixed(2);
  }
}

// Escuchar cambios
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', actualizarResultados);
});
