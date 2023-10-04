import createDataContext from "./createDataContext";

const subjectReducer = (state, action) => {
	switch (action.type) {
		case "add-test":
			// คือการหา id ที่มากที่สุดแล้วบวกเพิ่ม 1
			const nextId =
				state.reduce((maxId, test) => {
					return Math.max(maxId, test._id);
				}, 0) + 1;
			// คือการ return ข้อมูลเดิมแล้วเพิ่มข้อมูลใหม่เข้าไป
			return [
				...state,
				{
					_id: nextId,
					sub_id: action.payload.sub_id,
					subject_name: action.payload.subject_name,
					sec: action.payload.sec,
					room: action.payload.room,
					time: action.payload.time,
					day: action.payload.day,
				},
			];
		case "delete-test":
			// คือการลบข้อมูลที่มี id ตรงกับที่ส่งเข้ามา
			// โดยการ return ข้อมูลที่มี id ไม่ตรงกับที่ส่งเข้ามา
			return state.filter((test) => test._id !== action.payload._id);
		case "edit-test":
			// คือการแก้ไขข้อมูลที่มี id ตรงกับที่ส่งเข้ามา
			// โดยการ return ข้อมูลที่มี id ตรงกับที่ส่งเข้ามา แล้วเปลี่ยนข้อมูลใหม่เข้าไป
			return state.map((test) => {
				if (test._id === action.payload._id) {
					return action.payload;
				} else {
					return test;
				}
			});
		default:
			return state;
	}
};

const addTest = (dispatch) => {
	return (sub_id, subject_name, sec, room, time, day) => {
		const updateTime = new Date();
		console.table({ sub_id, subject_name, sec, room, time, day });
		dispatch({
			type: "add-test",
			payload: { sub_id, subject_name, sec, room, time, day },
		});
	};
};

const deleteTest = (dispatch) => {
	return (_id) => {
		console.log("delete: " + _id);
		dispatch({
			type: "delete-test",
			payload: { _id },
		});
	};
};

const editTest = (dispatch) => {
	return (id, sub_id, subject_name, sec, room, time, day) => {
		dispatch({
			type: "edit-test",
			payload: { id, sub_id, subject_name, sec, room, time, day },
		});
	};
};

export const { Context, Provider } = createDataContext(
	subjectReducer,
	{
		addTest,
		deleteTest,
		editTest,
	},
	[
		{
			_id: "1",
			sub_id: "01418223",
			subject_name: "Algorithm",
			sec: "700",
			room: "CB2301",
			time: "09.00-10.00",
			day: `${new Date().getDate()+2}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
		},
		{
			_id: "2",
			sub_id: "01418222",
			subject_name: "Concepts",
			sec: "700",
			room: "CB2301",
			time: "08.00-12.00",
			day: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
		},
		{
			_id: "3",
			sub_id: "01418223",
			subject_name: "System",
			sec: "700",
			room: "CB2301",
			time: "13.00-16.00",
			day: `${new Date().getDate()-2}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
		},
		{
			_id: "4",
			sub_id: "01418223",
			subject_name: "Database System Concepts",
			sec: "700",
			room: "CB2301",
			time: "18.00-20.00",
			day: `${new Date().getDate()-3}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
		},
	]
);
