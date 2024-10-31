export const codeGenerator = () => {

    const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const specialCharacters = ['!', '@', '#', '$', '%', '&', '*']

    const codeLength = 6

    let code: string = ''

    for (let i = 0; i < codeLength; i++) {

        const randomType = Math.floor(Math.random() * 3)

        let char: string = ''

        if (randomType === 0) char += letters[Math.floor(Math.random() * letters.length)]

        else if (randomType === 1) char += numbers[Math.floor(Math.random() * numbers.length)]

        else char += specialCharacters[Math.floor(Math.random() * specialCharacters.length)]

        code += char

    }

    return code

} 