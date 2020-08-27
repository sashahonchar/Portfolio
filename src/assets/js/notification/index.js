import {
    div,
    span,
    nav,
    ul,
    li,
    strong,
    a,
    h3,
    h4,
    h5,
    p,
    img,
    button,
    setStyle
} from '../helper'
import {mail} from '../images'

const NotificationBlock = div.cloneNode()
setStyle(NotificationBlock, {
    position: 'fixed',
    right: '15px',
    bottom: '15px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
})

const NotificationContainer = div.cloneNode()
setStyle(NotificationContainer, {
    padding: '2px 25px',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 3px 13px 1px rgba(0,0,0,0.12)',
    backgroundColor: '#ffffff',
    margin: '5px 0',
    minWidth: '250px'
})


const icon = img.cloneNode()
icon.src = mail
setStyle(icon, {
    width: '35px',
    height: '35px',
    marginRight: '15px'
})

const NotificationContent = div.cloneNode()
setStyle(NotificationContent, {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
})
const Notification = class {
    constructor() {
        this.NotificationBlock = NotificationBlock
        document.body.append(NotificationBlock)
        this.anim_show = 'slideInRight'
        this.anim_hide = 'slideOutRight'
    }
    

    add({ label, mess }) {
        let id = `_${+new Date()}`
        this.NotificationBlock.prepend( this.create({ label, mess, id }) )
        setTimeout( () => this.remove(id), 3000 )
    }

    remove(id) {
        const el = this.NotificationBlock.querySelector(`#${id}`)
        el.classList.remove(this.anim_show)
        el.classList.add(this.anim_hide)
        setTimeout( () => el.remove(), 500 )
    }
    create({ label, mess, id }) {
        const _NotificationContainer = NotificationContainer.cloneNode()
        _NotificationContainer.id = id
        _NotificationContainer.className = `transition ${this.anim_show}`
        const _NotificationContent = NotificationContent.cloneNode()

        const _icon = icon.cloneNode()

        const _NotificationLabel = h4.cloneNode()
        _NotificationLabel.className = 'card-label snake'
        _NotificationLabel.innerHTML = label

        const _NotificationMessage = p.cloneNode()
        _NotificationMessage.className = 'description'
        _NotificationMessage.innerHTML = mess

        _NotificationContent.append(_NotificationLabel, _NotificationMessage)
        _NotificationContainer.append(_icon, _NotificationContent)

        return _NotificationContainer
    }
}

    export const _notification = new Notification()
    window._notification = _notification