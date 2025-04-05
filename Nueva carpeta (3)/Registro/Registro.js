document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    let compra = parseFloat(document.getElementById('compra').value.replace(',', '.'));
    let venta = parseFloat(document.getElementById('venta').value.replace(',', '.'));
    let capital = parseFloat(document.getElementById('capital').value.replace(',', '.'));
    let comision = parseFloat(document.getElementById('comision').value);
  
    if (isNaN(compra) || isNaN(venta) || isNaN(capital)) {
      alert("Por favor ingresa valores válidos.");
      return;
    }
  
    let ventaNeta = venta - (venta * comision);
    let ganancia = (ventaNeta - compra) * capital;
  
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${new Date().toLocaleString()}</td>
      <td>${compra.toFixed(2)}</td>
      <td>${venta.toFixed(2)}</td>
      <td>${capital.toFixed(2)}</td>
      <td>${(comision * 100).toFixed(2)}%</td>
      <td>${ganancia.toFixed(2)}</td>
      <td><button onclick="eliminarFila(this)">❌</button></td>
    `;
  
    document.querySelector('#tablaHistorial tbody').appendChild(fila);
    document.getElementById('registroForm').reset();
  });
  
  function eliminarFila(btn) {
    const fila = btn.closest('tr');
    fila.remove();
  }
  
  // ✅ EXPORTAR A EXCEL
  function exportarExcel() {
    const tabla = document.getElementById('tablaHistorial');
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Historial" });
    XLSX.writeFile(wb, "HistorialOperaciones.xlsx");
  }
  
  // ✅ EXPORTAR COMO IMAGEN (versión hoja limpia)
  function exportarImagen() {
    const tabla = document.getElementById('tablaHistorial');
    const tablaClonada = tabla.cloneNode(true);
  
    // Eliminar columna de "Eliminar"
    tablaClonada.querySelectorAll('tr').forEach(fila => {
      fila.deleteCell(-1); // última celda
    });
  
    // Crear contenedor simple
    const contenedorLimpio = document.createElement('div');
    contenedorLimpio.style.padding = '30px';
    contenedorLimpio.style.backgroundColor = '#ffffff';
    contenedorLimpio.style.color = '#000000';
    contenedorLimpio.style.fontFamily = 'Arial, sans-serif';
    contenedorLimpio.style.fontSize = '14px';
    contenedorLimpio.appendChild(document.createElement('h2')).textContent = "Historial de Operaciones";
    contenedorLimpio.appendChild(tablaClonada);
  
    document.body.appendChild(contenedorLimpio);
  
    html2canvas(contenedorLimpio).then(canvas => {
      const enlace = document.createElement('a');
      enlace.href = canvas.toDataURL("image/png");
      enlace.download = "HistorialOperaciones.png";
      enlace.click();
      contenedorLimpio.remove();
    });
  }
  