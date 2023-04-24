const fs = require('fs')

class ProductManager{
    constructor(path){
        this.products=[]
        this.path=path
        this.init(path)
    }
    init(path){
        let file = fs.existsSync(path)
        if(!file){
            fs.writeFileSync(path,'[]')
                console.log('file created at path: '+this.path)
                return 'file created at path: '+this.path
        }else{
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async addProduct({title,description,price,thumbnail,stock}){
        try {
            let flag=0;
            let data = { title,description,price,thumbnail,stock }
            for(const value in data){
                if(data[value]===""){
                flag=1;} 
                }
            if(flag===0){
                if (this.products.length>0) {
                    let next_id = this.products[this.products.length-1].id+1
                    data.id = next_id
                } else {
                data.id = 1
                }
            this.products.push(data)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created user: '+data.id)
            return 'id´s user: '+data.id
        }else{
            console.log('Campos incompletos')
            return 'Campos Incompletos'
        }
        } catch(error) {
            console.log(error)
            return 'error: creating user'
        }
    }
    async getProducts() {
        try{
           if(this.products.length){
            return this.products
           }else{
            return 'Not found' 
           }     
        }catch(error){
            return 'getProducts:error'
        }  
    }
    async getProductById(id) {
        try{
        let search = this.products.find(each=>each.id===id)
        if(search){
            return search
        }else{
            return "Not found"
        }}
        catch(error){
            return 'getProductById: error'
        }
    }
    async updateProduct(id,data) {
        try {
            let search =await this.getProductById(id)
             if(search==="Not found"){
                console.log("No existe ID")
             }else{
                 for (let prop in data) {
                     search[prop] = data[prop]
                 }
                 let data_json = JSON.stringify(this.products,null,2)
                 await fs.promises.writeFile(this.path,data_json)
                 console.log('updateProduct: done , '+id)
                 return 'updated user: '+id
             }} 
             catch(error) {
                console.log(error)
                return 'updateProduct: error'
            }
         }
    async deleteProduct(id) {
        try {
            let search =await this.getProductById(id)
            if(search==="Not found"){
                console.log("No existe ID")
                return "Not found"
             }else{
            this.products = this.products.filter(each=>each.id!==id)
            console.log(this.products)
            let data_json = JSON.stringify(this.products,null,2)
           await fs.promises.writeFile(this.path,data_json)
            console.log('delete user: '+id)
            return 'delete user: '+id
        } }catch(error) {
            console.log(error)
            return 'error: deleting user'
        }
    }
    
}
async function manager() {
    let manager = new ProductManager('./products.json')
    await manager.addProduct({ title:'Motor WEG',description:'90L,ATEX',price:3500,thumbnail:"123.jpg",stock:3 });
    await manager.addProduct({ title:'Motor SEW',description:'132M',price:5000,thumbnail:"123.jpg",stock:2 });
    await manager.addProduct({ title:'Motor Siemens',description:'90L , Zona 1',price:3400,thumbnail:"41",stock:0 });
    await manager.addProduct({ title:'Reflector Delga',description:'150W',price:400,thumbnail:"41",stock:12 });
    await manager.addProduct({ title:'Refletor Warom',description:'150W ATEX',price:600,thumbnail:"41",stock:10 });
    await manager.addProduct({ title:'Artefacto Philips',description:'2x36W',price:100,thumbnail:"41",stock:20 });
    await manager.addProduct({ title:'Plafon 600x600',description:'Tipo Oficina',price:120,thumbnail:"41",stock:0 });
    await manager.addProduct({ title:'Prensa Cable M25',description:'Antiexplosivo',price:40,thumbnail:"41",stock:20 });
    await manager.addProduct({ title:'Prensa Cable M20',description:'Antiexplosivo',price:30,thumbnail:"41",stock:5 });
    await manager.addProduct({ title:'Prensa Cable 3/4 bsp',description:'Antiexplosivo',price:30,thumbnail:"41",stock:8 });

    await manager.getProducts()
    await manager.getProductById(9)
    await manager.updateProduct(9,{ title:'Prensa Cable 1/2 bsp' })
    await manager.deleteProduct(10)
    await manager.getProducts()

   
}
manager()
