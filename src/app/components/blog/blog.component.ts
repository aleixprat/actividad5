import { Component } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  titulo :string = "";
  imagen :string = "";
  cuerpo :string = "";
  date :string = "";
  
  contador :number = 0;
  arrPublicacion :Publicacion[] = [];
  contenidoPintar :string = "";

  //Propiedades para el css
  errorPublicar :string = "";
  visibilidadError :string = "";
  visibilidadPublicacion :string = "";
  visibilidadImagen : string = "";

  //En el constructor, inicializamos las dos publicaciones ------------------------------------
  constructor(){

    //Generamos fecha y las dos publicaciones
    const nuevaFecha = new Date;
    const fechaAcual = nuevaFecha.toLocaleString();

    //Mensaje: He definido como un json, no se si es lo que querias
    const arrayPublicaciones = {
      "publicaciones":[
        {
          "titulo": "Master Fullstack",
          "imagen":"https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "cuerpo": "Nuevo curso de Fullstack ya disponible en UNIR, echa un vistazo a todo nuestro contenido!",
          "date": ""
        },
        {
          "titulo": "HTML",
          "imagen":"https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "cuerpo": "Clases avanzadas de Angular, contenido exclusivo de nuestro lenguaje de marcado, no te lo pierdas.",
          "date": ""
        }
      ]
    };
    arrayPublicaciones.publicaciones.forEach( (elemento) => {
      elemento["date"] = fechaAcual;
      this.arrPublicacion.push(elemento);
    });

    //Número 2 ya que son dos publicaciones
    this.contador = 2;

    //Limpiamos clases de css
    this.visibilidadError = "ocultar-elemento";
    this.visibilidadPublicacion = "ocultar-elemento";
    this.visibilidadImagen = "ocultar-elemento";

    //Acción para pintar datos
    this.pintarPropiedad();

  }


  //Función que se lanza al clicar en el boton publicar ------------------------------------
  publicar(): void {

    this.errorPublicar = "";
    this.visibilidadError = "ocultar-elemento";
    this.visibilidadPublicacion = "ocultar-elemento";
    
    //Validamos si estan todos los campos informados
    let arrErrores: string[] = [];
    if (this.titulo == "") {
      arrErrores.push("título");
    } 
    if (this.imagen == "") {
      arrErrores.push("imagen");
    } 
    if (this.cuerpo== "") {
      arrErrores.push("cuerpo");
    }
    if (arrErrores.length > 0) {
      const singPlur = arrErrores.length == 1 ? "debe informarse el campo" : "deben informarse los campos";
      const camposInformar = arrErrores.toString();
      this.errorPublicar = `Error al publicar, ${singPlur} ${camposInformar}`;
      this.visibilidadError = "ver-error";
      return;
    }

    //Generamos fecha
    const nuevaFecha = new Date;
    const fechaAcual = nuevaFecha.toLocaleString();
    this.date = fechaAcual;

    //Añadimos posición al array y lanzamos función para pintar
    let publicacion: Publicacion = {
      titulo: this.titulo,
      imagen: this.imagen,
      cuerpo: this.cuerpo,
      date: this.date
    }
    this.arrPublicacion.push(publicacion);
   
    this.contador++;
    this.titulo = "";
    this.imagen = "";
    this.cuerpo = "";
    this.date = "";
    this.visibilidadPublicacion = "ver-mensaje-publi";
    this.visibilidadImagen = "ocultar-elemento";
    this.pintarPropiedad();
  }

  //Función que se activa una vez se ha cargado el array ------------------------------------
  pintarPropiedad(): void {
    this.contenidoPintar = `<li class="publicacion header-publicacion">
                                <span class="publicacion-titulo">Título</span>
                                <span class="publicacion-imagen">Imagen</span>
                                <span class="publicacion-cuerpo">Cuerpo</span>
                                <span class="publicacion-fecha">Fecha</span>
                            </li>`;

    this.arrPublicacion.forEach(publicacion => {
      this.contenidoPintar += 
      `<li class="publicacion">
          <span class="publicacion-titulo">${publicacion.titulo}</span>
          <div class="publicacion-imagen">
              <img src="${publicacion.imagen}" alt="imagen">
          </div>
          <span class="publicacion-cuerpo">${publicacion.cuerpo}</span>
          <span class="publicacion-fecha">${publicacion.date}</span>
      </li>`;

    });
  }

  //Para cuando se modifique la imágen del input -----------------------------------------------
  modificarImagen($event: any): void {
      let valorImagen = $event.target.value;
      this.visibilidadImagen = (valorImagen === "") ? "ocultar-elemento" : "ver-imagen";
  }

}
