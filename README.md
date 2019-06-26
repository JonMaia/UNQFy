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

El proyecto se configuro para que pueda correr los archivos .ts sin necesidad de compilarlos a .js (si existe la necesidad de  compilarlos a archivos .js, se realizarán los scripts para estos)  

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
---
**API REST**  
Se crearon endpoints para agregar, eliminar y obtener artistas, albumes y tracks. ([Documento visado 2](https://drive.google.com/drive/folders/1Z6QEKNDs4PfFot8y4O1_3JFiTNez-jIZ))    

* Endpoints de Tracks creados  
**POST** a `'/api/tracks` - Body `{idAlbum: <number>, name: <string>, duration: <number>, genres: <Array<string>>}`   
**GET** a `'/api/tracks/:id`
   
Se realizaron consultas a las api de Spotify y MatchMusix, con el fin de obtener albumes y letras de canciones en nuestro proyecto.  
Se puede levantar de 2 maneras del servidor con los siguientes scripts:  
**PROD:** `npm run server` (Levantará solo con los endpoints pedidos)  
**DEV:** `npm run server_dev` (En este se podrán utilizar endpoints de spotify y musixmatch, cada request a la api rest generará printeara data en la consola debido a la librería `morgan`)

**Spotify**  
Para utilizar la api de spotify primero debemos generar las credenciales para poder acceder a ella.  
Para esto se creo el script `npm run auth_spotify`, este levantará un servidor que nos llevara a loguearnos a spotify y tener las credenciales.
Se crearon endpoints para la obtención de id artista y sus albumes. Estos endpoints estan habilitados para la versión dev del proyecto.  
  
**Musix Match**  
Al igual que con la api de spotify, tiene endpoints para obtener tracks con sus ids y otro para obtener los lyrics de dicho id previamente obtenido. También, solo están disponibles para la versión dev del proyecto.  
  
 ***Aclaraciones:*** Tanto el uso de spotify y musixmatch están incluídos en el proyecto, por lo tanto tenemos los endpoints para obtener albumes de un artista y lyrics de un track, solo que bloquea para el usuario final.  
Dejo los endpoints para obtener albumes y tracks, en ambos casos no necesitan pasar argumentos por request ni query:  
* Albumes  
**POST** a `'/api/artists/:id/populate_albums'`  
* Tracks - Lyrics  
**GET** a `'/api/tracks/:id/lyrics'`

---
  
**Testing**  
Para ejecutar los test deberemos ingresar en consola `npm test`, nos printeara los test indicando cuales pasaron y cuales no.  
***Aclaraciones:*** primero deberemos generar las credenciales de spotify con el script `npm run auth_spotify`, ya que sino los test pueden romper 
   
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
