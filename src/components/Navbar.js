

const Navbar = ({ data }) => (
  <nav className="grid grid-cols-6 gap-4 rounded-md overflow-hidden shadow bg-white h-auto p-2 px-10 ">
    <div className="flex col-start-1 col-end-3 items-center">
      <button class="shadow-md flex bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-10 items-center justify-center">
        <i class="material-icons">add</i>
      </button>
      <p class="px-5  text-xl text-blue-600">Nova Safra</p>
    </div>
    <div className="flex col-end-7 col-span-2 items-center justify-end">
      <img className="shadow-md rounded-full h-10 w-10" src={data} alt="Avatar" />

    </div>
  </nav>
);

export default Navbar;
