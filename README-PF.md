# Nombre del Proyecto: MDLinks 

[Descripción]
Libreria desarrollada en Node.js que tiene como objetivo analizar los enlances o links encontrados dentro de archivos Mardown. Los
archivos que podra leer la libreria deben tener alguna de las siguientes extensiones: .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, .text

[Documentación-técnica]
* La libreria se construo usando módulos Common.js
* Se importaron los módulos fs y path para trabajar con el sistema y ruta de archivos.

[Flujo-de-trabajo]
Se realizo un diagrama de flujo para facilitar la creación del codigo y la modularización del mismo. El diagrama se encuentra en la carpeta raiz del proyecto, con extensión jpeg y con su nombre homónimo: Diagrama de flujo. 

[Guia-de-instalación]
* Esta libreria esta disponible como un módulo publicado en GITHUB. 

* Usa el comando:  npm install Ale771992/DEV010-md-links

[Especificaciones-de-Uso]
La libreria analizara el archivo en cuestión, dando como resultado un arreglo, por cada enlace encontrado con las siguientes propiedades: 
* href: El enlace que se leyo.
* Text: El texto que acompaña y que corresponde al enlance, para dar un contexto más especifico de que información se puede encontrar dentro del enlance. 
* file: La ruta absoluta del archivo contenedor del enlance o enlances. 
* status: El codigo de respuesta a la solicitud HTTP; Sera 200 en caso de que haya resultado exitosa o 404 en caso de que no haya sido exitosa. 
* success: El mensaje "ok" cuando el codigo sea 200 y el mensaje "fail" cuando el codigo sea 404. 