import React, { useState, useContext, useReducer } from "react";

const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

const initialState = {
    _id: "",
    sub_code: "",
    sub_id: "",
    subject_name: "",
    edition: "",
    timestart: "",
    timeend: "",
    day: "",
    month: "",
    year: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                _id: action.payload._id,
                sub_code: action.payload.sub_code,
                sub_id: action.payload.sub_id,
                subject_name: action.payload.subject_name,
                edition: action.payload.edition,
                timestart: action.payload.timestart,
                timeend: action.payload.timeend,
                day: action.payload.day,
                month: action.payload.month,
                year: action.payload.year,
            };

        default:
            return state;
    }
}

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [initialState]);
    // const value = { state, dispatch };

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
}
