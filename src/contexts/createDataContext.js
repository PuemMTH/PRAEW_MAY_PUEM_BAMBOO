import React, { useReducer, createContext } from "react";

export default (reducer, actions, initialState) => {
	// Create Context เพื่อเก็บ state และ dispatch
	const Context = createContext();

	// สร้าง Provider เพื่อเอาไว้ใช้ในการเรียกใช้ state และ dispatch
	const Provider = ({ children }) => {
		// สร้าง state และ dispatch จาก useReducer
		const [state, dispatch] = useReducer(reducer, initialState);
		// สร้าง boundActions เพื่อเอาไว้เรียกใช้ actions
		const boundActions = {};
		// วนลูปเพื่อเอา actions ที่ส่งเข้ามาใส่ใน boundActions 
		for (let key in actions) {
			// เรียกใช้ actions และส่ง dispatch ไปด้วย
			boundActions[key] = actions[key](dispatch);
		}
		return (
			// ส่ง state และ boundActions ไปให้ Context.Provider
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};
	return { Context, Provider };
};