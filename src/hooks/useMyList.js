import { useContext } from "react";
import ListContext from "../context/ListContext";


const useMyList = () => useContext(ListContext);

export default useMyList