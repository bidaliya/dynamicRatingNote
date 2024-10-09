import './App.css'
import DynamicScreen from './components/DynamicScreeen'
import { DynamicComponent } from './DataInterface';
import componentsData from './data.json' 

function App() {

  // const componentsData: DynamicComponent[]  = [
  //   {
  //     type: "table",
  //     id: 1,
  //     label: "My Table",
  //     footer: "xyz",
  //     data: [
  //       {
  //         rowHead: "Total",
  //         bgColor: "#f22234",
  //         columns: [
  //           {
  //             value: "2023",
  //             bgColor: "#f22234"
  //           },
  //           {
  //             value: "2024",
  //             bgColor: "#f22234"
  //           },
  //           {
  //             value: "2025",
  //             bgColor: "#f22234"
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     type: "text",
  //     id: 2,
  //     label: "My label",
  //     margin: {
  //       right: "10px"
  //     },
  //     link: "https://google.com"
  //   }
  // ];
  return (
    <>
      <DynamicScreen componentsData={componentsData as DynamicComponent[]} />,
    </>
  )
}

export default App
