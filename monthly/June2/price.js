function priceCarry(price) {
    if (price != 0)
        return parseInt(price) + 1
    else
        return price
}
console.log(priceCarry(0.155))
console.log(priceCarry(0))
console.log(priceCarry(11))
console.log(priceCarry(11.02))
console.log(priceCarry(12.0994561879813433155497))
console.log(priceCarry(-2.12))