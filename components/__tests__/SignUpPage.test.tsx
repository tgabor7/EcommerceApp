import { validateConfirmPassword, validateEmail, validatePassword } from "../SignUpPage"


describe("Signup validation tests", () => {
    test("Email should fail validation", () => {
        expect(validateEmail("asd")).toBe(false)
        expect(validateEmail("@")).toBe(false)
        expect(validateEmail("@g")).toBe(false)
        expect(validateEmail("a@")).toBe(false)
    })
    test("Email should pass validation", ()=>{
        expect(validateEmail("asd@gmail.com")).toBe(true)
        expect(validateEmail("qwe@yahoo.com")).toBe(true)
        expect(validateEmail("as@freemail.hu")).toBe(true)
    })
    describe("Password validation", ()=>{
        test("Password should fail validation", ()=>{
            expect(validatePassword("0")).toBe(false)
            expect(validatePassword("02")).toBe(false)
            expect(validatePassword("033")).toBe(false)
            expect(validatePassword("0444")).toBe(false)
            expect(validatePassword("04440")).toBe(false)
        })
    })
    describe("Confirm password test", ()=>{
        test("Password should be equal to confirm password", ()=>{
            expect(validateConfirmPassword("123456", "123456")).toBe(true)
            expect(validateConfirmPassword("123456", "12345")).toBe(false)
            expect(validateConfirmPassword("123456", "")).toBe(false)
        })
    })
})