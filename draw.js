function makeDirectionVector(angleDegree, length) {
    const radian = 2*Math.PI*angleDegree / 360
    return [ length * Math.cos(radian), length * Math.sin(radian) ] 
}

function makePolygonPoints(radius, center) {
    const [cx, cy] = center
    let points = []
    for (let i = 0; i < 6; i++) {
        const angDegree = i * 60
        let pt = makeDirectionVector(angDegree, radius)
        pt = [ pt[0]+cx, pt[1]+cy ]
        points.push(pt)
    }
    return points
}

function addVec(p1, p2) {
    return [p1[0]+p2[0], p1[1]+p2[1]]
}

function scaleVec(p, s) {
    return [p[0]*s, p[1]*s]
}

function renderAxisVal(x) {
    return Number(x).toFixed(2).replace(/0+$/,'').replace(/\.$/,'')
}

function renderPoint(point) {
    return `${renderAxisVal(point[0])},${renderAxisVal(point[1])}`
}

function renderPoints(points) {
    return points.map(p=>renderPoint(p)).join(' ')
}

function renderSVG(polygon, fill, stroke){
    return `<polygon points="${renderPoints(polygon)}" fill="${fill}" stroke="${stroke}" />`
}

const deepGray = '#2c3e50'

function makeOpacityColor(colorHex, opacityHex) {
    return `${colorHex}${opacityHex}`
}

function main() {
    const radius = 14
    const cos = radius * Math.cos(Math.PI/6)
    const gap = 2
    const center0 = [250,155]
    const col1 = [
        center0,
    ]
    const col2 = [
        addVec(center0, makeDirectionVector(360-30, 2*cos+gap)),
        addVec(center0, makeDirectionVector(30, 2*cos+gap)),
    ]
    const col3 = col2.map(pt => addVec(pt, makeDirectionVector(360-30, 2*cos+gap)))
    const col4 = col3.map(pt => addVec(pt, makeDirectionVector(30, 2*cos+gap))).slice(1)

    for (const pt of col1) {
        console.log(renderSVG(makePolygonPoints(radius, pt), makeOpacityColor(deepGray, 'ff'), 'none'))
    }

    for (const pt of col2) {
        console.log(renderSVG(makePolygonPoints(radius, pt), makeOpacityColor(deepGray, 'cf'), 'none'))
    }

    for (const pt of col3) {
        console.log(renderSVG(makePolygonPoints(radius, pt), makeOpacityColor(deepGray, '9f'), 'none'))
    }

    for (const pt of col4) {
        console.log(renderSVG(makePolygonPoints(radius, pt), makeOpacityColor(deepGray, '6f'), 'none'))
    }

    
}

if (require.main === module) {
    main();
}
