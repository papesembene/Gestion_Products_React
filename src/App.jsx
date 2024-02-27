import { useState } from "react"
import { Input } from "./components/forms/Input.jsx"
import { Checkbox } from "./components/forms/Checkbox.jsx"
import { ProductCategoryRow } from "./products/ProductCategoryRow.jsx"
import { ProductsRow } from "./products/ProductsRow.jsx"

const PRODUCTS = [
  {'category':'Fruits','price':'$1',"stocked":true,'name':'Apple'},
  {'category':'Fruits','price':'$3',"stocked":true,'name':'PineApple'},
  {'category':'Fruits','price':'$2',"stocked":false,'name':'Mango'},
  {'category':'Vegetables','price':'$2',"stocked":true,'name':'Potato'},
  {'category':'Vegetables','price':'$1',"stocked":false,'name':'Peas'},
  {'category':'Vegetables','price':'$1',"stocked":false,'name':'Spinach'}
]
function App() {
/*const [ischecked,setTerme] = useState(false)

return <form action="">
        <Checkbox checked={ischecked} onCheck={setTerme}  ></Checkbox>
        <button type="submit" disabled={!ischecked}>Envoyer</button>
       </form>
 
  function Checkbox({checked,onCheck}) {

    return <div>
          <label htmlFor="">
          <input type ="checkbox" checked={checked} onChange={(e)=>onCheck(e.target.checked)}/>
                  Accepter les conditions d'utilisations
          </label>
              
          </div>
 }*/
   const [showStock,setshowstock] = useState(false)
   const [inputSearch,setInputSearch] = useState('')
   const visibleProduct = PRODUCTS.filter(product=>{
     if (showStock && !product.stocked){
      return false 
     }
     if (inputSearch && !product.name.includes(inputSearch)){
        return false
     }
     return true
   })
    return <div className="container my-3">
         <SearchBar showstock={showStock} onShowstockChange={setshowstock} inputSearch={inputSearch} onInputChange={setInputSearch}/>
        <ProductTable products={visibleProduct}/>
        </div>
}

function SearchBar({showStock, onShowstockChange,inputSearch,onInputChange}) {
  return <div>
              <div className="mb-3">
            <Input  placeholder="Rechercher" value={inputSearch} onChange={onInputChange}/>
            <Checkbox checked={showStock} onChange={onShowstockChange} label="N'afficher que les produits en stock"  id ="stocked"/>
            <input type="range" name="" id=""className="form-range"  min={2} max={5}/>
            </div>
        </div>
}
function ProductTable({products}) {
  const rows = []
  let lastcategory = null  
  
  for (const product of products) {
      if (product.category !== lastcategory) {
        rows.push(<ProductCategoryRow key={product.category} name={product.category}/>)
      }
      lastcategory = product.category
      rows.push(<ProductsRow product={product} key={product.name}/>)
      
  }
  return <table className="table table-striped">
    <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
    </thead>
   
    <tbody>
      {rows.length!=0 ?rows:<h3>Aucun produit</h3>}
    </tbody>
  </table>
}


export default App
