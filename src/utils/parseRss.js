import Parser from 'rss-parser'

const parser = new Parser()

const parse = raw => parser.parseString(raw)

export default parse
