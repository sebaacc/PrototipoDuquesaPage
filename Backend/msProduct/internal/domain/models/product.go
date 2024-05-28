package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	SubCategoryID primitive.ObjectID `bson:"subCategoryId" json:"subCategoryId"`
	Name          string             `bson:"name" json:"name"`
	Description   string             `bson:"description" json:"description"`
	Price         float64            `bson:"price" json:"price"`
	/*La entidad de productImage no se está usando, en Mongo no es 100% necesario poner
	 las imágenes en otro documento sin importar si son muchas, lo que sucede es que en Mongo
	 las cosas se guardan en un documento con estructura tipo JSON, por lo que el array de imágenes
	 se puede poner directamente en el documento de producto, esto nos da una ventaja a la hora de consultar
	 los productos, ya que al tener que consultar solo un documento en vez de varios relacionandolos con un id
	 las consultas son más eficientes y se hacen más rápido, podría ser perjudicial si queremos actualizar las imágenes,
	 ya que tendríamos que editar todo el producto.
	 pd: Esto no lo hemos consultado bien, pero puede ser que también sea perjudicial a la hora de traer el producto
	 y no querer traer todas las imágenes, pero esto no lo sabemos aún, vamos a consultar si hay una manera de traer
	 el producto sin imágenes o solo con algunas
	*/
	ImageURLs     []string           `bson:"imageURLs" json:"imageURLs"`
}
