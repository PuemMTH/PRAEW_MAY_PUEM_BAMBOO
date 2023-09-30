import React, { useState, useContext, useReducer } from "react";
import createDataContext from "./createDataContext";

const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

const initialState = {
    _id: "",
    sub_id: "",
    subject_name: "",
    sec: "",
    room: "",
    time: "19:00-21:00",
    day: "29/09/2021",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA":
            return { ...state, ...action.payload };
        case "CLEAR_DATA":
            return { ...initialState };
        default:
            return state;
    }
}

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {...initialState});
    const [list, setList] = useState([]);
    listSubject = {list, setList}

    return (
        <DataContext.Provider value={{ state, dispatch, listSubject }}>
            {children}
        </DataContext.Provider>
    );
}