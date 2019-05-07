# UnqFy
WebServices / UnqFy
  
**UML**  
![uml](https://github.com/Ariel20395/UnqFy/blob/master/UnqFy.png)
  
**Instalación**  
Ingresar en consola  
```bash
npm install
```
Esto va a instalar todas las dependencias del proyecto definidas en `package.json`, en este archivo esta toda la configuración del proyecto.
Dentro de las dependencias se instalan: 
* typescript
* ts-node (consola de node para typescript)
* mocha (para testing)
* yargs (para ingreso de comandos en consola)

El proyecto se configuro para que pueda correr los archivos .ts sin necesidad de compilarlos a .js (si es necesario, se realizarán 
los scripts necesarios para la compilación)  

**Uso de UNQfy**  
Para ejecutar el main debemos ingresar `ts-node <dir main.ts>` junto a los comandos a ejecutar. En nuestro caso, se encuentra en `src/main`  
```bash
ts-node src/main [> args]
```  
  
Para ver los comandos disponibles ingresar en la consola  
```bash
ts-node src/main --help
```  
***Nota:*** para poder utilizar los comandos de consola `ts-node` y `typescript` deben ser instalados globalmente, para esto 
debemos ingresar en consola `npm install -g typescript ts-node`
  
Si queremos pre-cargar datos podemos usar el script build, este ejecutará todos los comandos para cargar artistas, albumes, tracks y playlist guardados en el archivo `datos.sh`.  
Para poder usar correctamente el build, primero debemos darle permisos a `datos.sh`
```bash
chmod +x datos.sh
```  
Luego para ejecutar la pre-carga de datos
```bash
npm run build
```  

**Testing**  
Para ejecutar los test deberemos ingresar en consola `npm test`, nos printeara los test indicando cuales pasaron y cuales no
  
---  
**Yargs**  
Como estamos usando yargs podemos definir los comandos que deseemos para usar en consola, si el comando no existe no ejecutará nada ni romperá, solo se mostrará que se puede usar el comando de ayuda para ver los comandos disponibles.  
Detallo un poco como se usa yargs:  
```ts
.command('addArtist', 'Crea un nuevo artista', {
                    name: {
                        demand: true,
                        alias: 'n',
                        desc: 'Nombre del artista'
                    },
                    country: {
                        demand: true,
                        alias: 'c',
                        desc: 'País del artista'
                    }
                });
```  
En este caso creamos el comando `addArtist` con su descripción y que tiene dos campos obligatorios (name, country), alias y una descripción de estos campos. De esta manera, nos aseguramos que reciba todos los parametros necesarios para el comando en cuestión.  
Para usarlos debemos ingresar en consola  
```bash
ts-node main addArtist --name '{nombre del artista}' --country '{país del artista}'
```  
También como tiene alias se podría ingresar de la siguiente manera  
```bash
ts-node main addArtist -n '{nombre del artista}' -c '{país del artista}'
```  
