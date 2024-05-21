import { Link } from "react-router-dom";

export default function Registro() {
  return (
    <div>
      pagina de registro
      <Link to={`/`}>
        <img
          src="src\img\lgofondoclaro-removebg-preview 1.png"
          alt="Logo La duquesa del formulario"
        />
      </Link>
      <h3 className="text-center sm:text-left p-8 font-extrabold ">Usuario</h3>
    </div>
  );
}
