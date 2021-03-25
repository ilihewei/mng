const setProjectId = (state,obj)=>{
    state.fileProjectId = obj;
}

const setGeo = (state,obj)=>{
    // console.log("obj:",obj)
    state.geoInfo = obj;
}

const setDevInfo = (state,obj)=>{
    // console.log("devInfo:",obj)
    state.devInfo = obj;
}
 const setPageTxt = (state,obj)=>{
    // console.log("pagetxt:",obj)
    state.pageTxt = obj;
}

const setPageTit = (state,obj)=>{
    // console.log("pagetxt:",obj)
    state.pageTit = obj;
}

const setChangeMenu = (state,obj)=>{
    console.log("menu:",obj)
    state.menu = obj;
}

export {
    setProjectId,
    setGeo,
    setDevInfo,
    setPageTxt,
    setPageTit,
    setChangeMenu
}