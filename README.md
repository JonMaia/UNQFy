# UnqFy
WebServices / UnqFy
  
**Instalación**  
Ingresar en consola  
```bash
npm install
```
Esto va a instalar todas las dependencias del proyecto definidas en `package.json`, en este archivo esta toda la configuración del proyecto.
Dentro de las dependencias se instalan: typescript, ts-node (es la consola de node para typescript), mocha (para testing).  

El proyecto se configuro para que pueda correr los archivos .ts sin necesidad de compilarlos a .js (si es necesario, se realizarán 
los scripts necesarios para la compilación)  

**Uso**  
Para ejecutar el main debemos ingresar `ts-node <dir main.ts>` en nuestro caso, se encuentra en `src/main`  
```bash
ts-node src/main [> args]
```  
  
Luego, para correr los test deberemos ingresar en consola `npm test`, nos printeara los test indicando cuales pasaron y cuales no
