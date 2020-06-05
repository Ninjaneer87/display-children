const shopElement = document.querySelector('.shop');

const items = fetch('./task.json')
.then(res => res.json())
.then(data => {
    displayChildren(data)
});

const displayChildren = (children) => {
    children.forEach(child => {
        const element = document.createElement('div');
        element.classList.add(`item-${child.id}`);
        element.innerHTML = child.name;

        if(child.parent_id === "0") {
            shopElement.appendChild(element);
        } else {
            const parent = document.querySelector(`.item-${child.parent_id}`);
            parent.appendChild(element);
        }

        if(child.children[0]) {
            element.innerHTML = `${arrowClosed} ${child.name}`;
            element.addEventListener('click', () => {
                if(event.target === element) {
                    element.childNodes[0].nodeValue = toggleArrow(element);
                    toggleChildren(element);
                }
            })
            displayChildren(child.children[0]);
            toggleChildren(element);
        } else {
            return;
        }
    });
}
const arrowClosed = "►";
const arrowOpenned = "▼";

const toggleArrow = (element) => {
    const innerText = element.childNodes[0].nodeValue.split(' ');
    let arrow = innerText[0];
    const name = innerText[1];
    arrow = (arrow === arrowClosed) ? arrowOpenned : arrowClosed;
    const caption = `${arrow} ${name}`;
    return caption;
}
const setClosedArrow = (element) => {
    const innerText = element.childNodes[0].nodeValue.split(' ');
    let arrow = arrowClosed;
    const name = innerText[1];
    const caption = `${arrow} ${name}`;
    return caption;
}

const toggleChildren = (element) => {
    [...element.children].forEach(child => {
        if(child.classList.contains('hide')) {
            child.classList.remove('hide')
        } else {
            hideAllChildren(child)
            child.classList.add('hide');
        }
    })
}
const hideAllChildren = (element) => {
    if([...element.children].length > 0)
    element.childNodes[0].nodeValue = setClosedArrow(element);

    [...element.children].forEach(child => {
        child.classList.add('hide');
        if(child.children) {
            hideAllChildren(child);
        } else {
            return
        }
    })
}