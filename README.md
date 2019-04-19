# UnqFy
WebServices / UnqFy
  
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


***Comandos***   
* help: Muestra todos los comandos disponibles  
```bash
ts-node src/main addArtist --help
```

* addArtist: Crea un nuevo artista
```bash
ts-node src/main addArtist --name '{nombre del artista}' --country '{país del artista}'
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
