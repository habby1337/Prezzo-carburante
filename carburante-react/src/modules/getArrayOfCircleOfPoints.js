function getArrayOfCircleOfPoints(pointList) {
    // console.log(pointArray);

    let pointsList = [];
    let finalPointsList = [];

    pointList.forEach(element => {
        if (element !== null) {
            pointList.push(element);
        }
    });

    pointList = pointList.filter(function () { return true; });


    pointList.forEach((point, index) => {
        finalPointsList[index] = {
            "lat": point[0],
            "lng": point[1]
        }
    })

    return finalPointsList;
}

export default getArrayOfCircleOfPoints;