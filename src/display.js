/**
 * DOM Display
 */

const DEFAULT_OPTIONS = {
        id: '',
        parent: document.body,
        width: 80,
        height: 25,
        fontSize: 16,
        tileWidth: 16,
        tileHeight: 16,
        fontFamily: 'monospace',
        fg: '#ccc',
        bg: '#000',
    },
    createElement = (type) => document.createElement(type)

export default class Display {
    constructor(options = {}) {
        this._el = createElement('section')
        this._el.classList.add('terminal')

        this.setOptions(options)

        this._listeners = {}
        this._data = {}

        this.initCells()
        this.initEvents()
    }

    setOptions(options) {
        options = Object.assign({}, DEFAULT_OPTIONS, this._opts, options)
        this._el.id = options.id
        this._el.style.cssText = `font-family: ${options.fontFamily}; font-size: ${options.fontSize}px`
        this._opts = options
    }

    initCells() {
        for (let y = 0; y < this._opts.height; y++) {
            const row = createElement('div')
            row.style.display = 'flex'
            this._el.append(row)

            for (let x = 0; x < this._opts.width; x++) {
                const col = createElement('div')
                col.style.display = 'flex'
                row.append(col)

                col.dataset.x = x
                col.dataset.y = y

                col.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: ${this._opts.fg};
                    background-color: ${this._opts.bg};
                    width: ${this._opts.tileWidth}px;
                    height: ${this._opts.tileHeight}px;
                `

                this._data[`${x},${y}`] = col
            }
        }

        if (this._opts.parent) {
            this._opts.parent.append(this._el)
        }
    }

    initEvents() {
        this._listeners.input = this._inputHanler.bind(this)
        this._el.addEventListener('click', this._listeners.input)
    }

    destroy() {
        this._el.removeEventListener('click', this._listeners.input)
    }

    getContainer = () => this._el

    get W() {
        return this._opts.width
    }

    get H() {
        return this._opts.height
    }

    clear() {
        // TODO
        for (let y = 0; y < this._opts.height; y++) {
            for (let x = 0; x < this._opts.width; x++) {
                this.draw(x, y, '')
            }
        }
    }

    draw(x, y, ch, fg, bg, altText) {
        if (this._validateXY(x, y)) {
            const cell = this._data[`${x},${y}`]
            cell.textContent = ch ? ch[0] : ''
            cell.style.backgroundColor = bg || this._opts.bg
            cell.style.color = fg || this._opts.fg
            cell.ariaLabel = altText || ''
        }
    }

    drawTile(x, y, image, altText) {
        throw new Error('Not implemented yet')
    }

    _validateXY(x, y) {
        return x >= 0 && x < this._opts.width && y >= 0 && y < this._opts.height
    }

    /**
     * @param {Event} ev
     */
    _inputHanler(ev) {
        console.log(ev)
    }
}
