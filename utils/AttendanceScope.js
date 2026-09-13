


const getAttendanceScope = (role)=>{
    switch(role){
        case "Employee":
            return "SELF";
        case "Team Lead":
            return "TEAM";
        case "Manager":
            return "TEAM";
        case "HR":
            return "ALL";
        case "Director":
            return "ALL";
        case "CEO":
            return "ALL";
        default:
            return null;
    }
};

export default getAttendanceScope;