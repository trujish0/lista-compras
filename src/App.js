import "./styles.css";
import product from "./productos.json";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [list, setList] = useState(product);
  const [name, setName] = useState("");
  const [filteredList, setFilteredList] = new useState(list);

  function ProductList(props) {
    const listItems = filteredList.map((product) => (
      <li className="list-group-item" key={product.id}>
        {product.name}
        <button
          className="btn btnRemove"
          onClick={() => removeItem(product.id)}
        >
          x
        </button>
      </li>
    ));
    return <ul className="list-group">{listItems}</ul>;
  }

  // Agregar
  function HandleChange() {
    setName(event.target.value);
  }
  function addItem(e) {
    e.preventDefault();
    const newList = list.concat({ name, id: nanoid() });
    setList(newList);
    setFilteredList(newList);
    setName("");
  }

  // Filtro
  const filterBySearch = (event) => {
    const query = event.target.value.toLowerCase();
    var updatedList = [...list];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query) !== -1;
    });
    setFilteredList(updatedList);
  };

  // Eliminar
  const removeItem = (id) => {
    const productsRemove = list.filter((elem) => elem.id !== id);

    setList(productsRemove);
    setFilteredList(productsRemove);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="block1 block">
          <h2>Lista de compras</h2>
        </div>
        <div className="block2 block">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/011/420/901/small/strawberry-fruit-cartoon-png.png"
            alt="frutilla"
            height="60"
            width="60"
          />
        </div>
        <div className="block3 block">
          <input
            className="i"
            placeholder="Buscar..."
            id="filter"
            onChange={filterBySearch}
          />
        </div>
      </div>
      <div>
        <ProductList />
      </div>
      <div className="addItem">
        <form onSubmit={addItem}>
          <label>
            <input
              type="text"
              placeholder="Agregar producto..."
              value={name}
              onChange={HandleChange}
              className="form-control"
            />
          </label>
        </form>
      </div>
    </div>
  );
}
