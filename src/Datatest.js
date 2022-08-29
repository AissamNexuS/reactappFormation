import * as React from "react";
import axios from "axios";

export default function DataTable(item) {
  const [Product, setProduct] = React.useState([]);
  const DataApi = async () => {
    try {
      const Data = await axios.get(
        "https://api.yamiz.fr/api/v1/products?$top=12&$skip=0&$q=&$expand=category"
      );
      console.log(Data.data.value);
      setProduct(Data.data.value);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    DataApi();
  }, []);
  Product.map((item) => {
    return console.log(
      item.id,
      item.name,
      item.packaging,
      item.updated_at,
      item.created_at
    );
  });
  return (
    <div className="container" style={{ width: "100%" }}>
      <table className="table table-bordered">
        <thead>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>updated_at</th>
          <th>created_at</th>
        </thead>
        <tbody>
          {Product.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.packaging}</td>
              <td>{item.updated_at}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
