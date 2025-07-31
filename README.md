# SIDO (Sistema Integral de Diagnóstico Organizacional)

Link directo [SIDO](https://sdoimx.com)
_Nota: entrar con el código: OMOR7_  
_Si marca un error la primera vez, intentar de nuevo unos segundos después._

## WebApp creada para la optimización en la recolección y análisis de metricas de calidad (KPI's) para una PYME.

----

### 🔨 Técnologias Usadas:  
**Frontend**
- ReactJS
- Bulma
- Recharts
- Toastify
- HTML
- CSS

**Backend**
- Javascript
- Axios
- MySQL
- NodeJS
- Render

### ⚙️ Funcionamietnto
**Log In**  
Para el componente de Log In se maneja lo siguiente:  
- Rutas protegidas: Se protege la ruta del _Home_ para evitar que alguien no autenticado pueda acceder a él.
- Autenticación: Se autentica al usuario con la base de datos para permitir el acceso.

**Home**  
En el componente principal, que funciona como punto de partida después de ingresar a la webapp:  
- El componente **Header** contiene todas las rutas/apartados de la webapp, pudiendo funcionar usando **react-router**
- El componente **Overview** se encarga de cargar y mostrar la descripción completa del sitio.
- El componente **Concepts** funciona a modo de glosario, donde se pueden consultar toda la terminología usada dentro de la webapp.
- El componente **Results** muestra todos los resultados que hay registrados dentro de la base de datos. Los componentes de resultados se listan a continuación:
  - ECAI: Resultados del análisis ECAI.
  - DespOrg: Resultados del cálculo de desperdicio organizacional.
  - NOMRes: Resultados de la norma NOM-035 utilizando las Guias II y III
  - DespKPI: Resultados de los KPI de los años 2024 y 2025 que funcionan para:
      - Departamentos
      - Empleados
- El componente **Summary** reune los resultados de los años 2024 y 2025 tanto para los departamentos y los empleados y los compara, mostrando un resumen y si es que aumentó su valor o disminuyó.

# 🤔 FAQS
**¿Qué sucede si se muestra un error al intentar ingresar o consultar algún resultado?**  
Si se muestra un error, es problema del servidor para recuperar los datos. Lo recomendable es esperar unos segundos a que responda y recargar la página o dar click en otro apartado y volver a donde se quiere ver la información para que se cargue otra vez.  
El sistema puede tardar un poco en cargar, por lo que, a menos que se muestre una notificación de error, favor de ser paciente y esperar una respuesta.  

**¿Que pasa si no puedo entrar al sistema?**  
Si no se encuentra el usuario, es porque no está registrado en la base de datos para que pueda acceder. El sistema no hace diferencia entre mayúsculas o minúsculas por lo que puede ser el caso que esté registrado con un código diferente o no exista en la base de datos.  

**Al seleccionar un empleado para ver sus resultados, se muestra que no hay datos**  
Esto sucede porque no hay registros del análisis para ese empleado en el año seleccionado.  

**¿Por qué no aparecen todos los empleados registrados en el apartado de 'Summary'?**  
En este resumen, solamente se puede ver la comparación de aquellos empleados los cuales participaron en las encuestas de ambos años, por lo que, si no se tiene registrado el resultado de un año en específicado, no se incluirá en la lista.
