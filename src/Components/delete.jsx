import React from "react";
import { useNavigate } from "react-router-dom";

const NavUser = () => {
    let navigation = useNavigate();
    navigation('/ajouterUtilisateur')
}
export default NavUser;