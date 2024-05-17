import Nav from "@/components/Nav";


export default function Layout({children}) {
  
  

  

  return (
    <div className="bg-sky-950 min-h-screen flex">
      <Nav />
      <div className="bg-gray-200 flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">{children}</div>
    </div>
    
  );
}
