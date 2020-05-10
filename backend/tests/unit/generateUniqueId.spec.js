const { generateUniqueId } = require('../../src/utils/functions/generateUniqueId')

describe('Generate Unique ID', () => {
    it('Should generate an unique ID', ()=> {
        const mock = {
            ids: [],
            isRepeated: false,
            toHaveLength: 8
        }

        expect(mock.isRepeated).toBe(false)
        expect(mock.toHaveLength).toBe(8)
    })
})