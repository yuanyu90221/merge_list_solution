function ListNode(val, next) {
    this.val = (val === undefined) ? 0 : val;
    this.next = (next === undefined) ? null : next;
}
/**
 * 
 * @param {Array<number>} arrary 
 * 
 * @return {ListNode}
 */
const buildList = (arrary) => {
    let target = null;
    let head = null;
    arrary.forEach(item => {
        const node = new ListNode(item, null);
        if (head === null) {
            target = node;
            head = target;
        } else {
            target.next = node;
            target = target.next;
        }
    })
    return head;
}
/**
 * 
 * @param {ListNode} L 
 */
const trans = (L) => {
    while (!!L) {
        console.log(`${L.val}->`)
        L = L.next;
    }
}
/**
 * 
 * @param {ListNode} L1 
 * @param {ListNode} L2 
 * 
 * @return {ListNode}
 */
const mergeList = (L1, L2) => {
    let ptr1 = L1, ptr2 = L2;
    let target = null, head = null;
    while (!!ptr1 || !!ptr2) {
        const ptr1Status = (ptr1 === null) ? 0b00 : 0b01;
        const ptr2Status = (ptr2 === null) ? 0b00 : 0b10;
        const status = ptr1Status | ptr2Status;
        let modifyTarget = 0;
        switch (status) {
            case 0:
                break;
            case 1:
                modifyTarget = 1;
                break;
            case 2:
                modifyTarget = 2;
                break;
            default:
                const isL1small = ptr1.val < ptr2.val;
                if (isL1small) {
                    modifyTarget = 3;
                } else {
                    modifyTarget = 4;
                }
                break;
        }
        if (modifyTarget > 0) {
            const result =  (modifyTarget === 1 || modifyTarget === 3) ? copyNodeToTargetTail(head, target, ptr1): 
            copyNodeToTargetTail(head, target, ptr2);
            if (modifyTarget ===1|| modifyTarget === 3) {
                ptr1 = result.ptr;
            } else {
                ptr2 = result.ptr;
            }
            head = result.head;
            target = result.target;
        }
    }
    return head;
}
/**
 * 
 * @param {ListNode} head 
 * @param {ListNode} target 
 * @param {ListNode} ptr 
 */
const copyNodeToTargetTail = (head, target, ptr) => {
    if (head === null) {
        head = new ListNode(ptr.val, null);
        target = head;
    } else {
        target.next = new ListNode(ptr.val, null);
        target = target.next;
    }
    ptr = ptr.next;
    return { head, target, ptr }
}
const L1 = buildList([1, 3, 4]);
const L2 = buildList([1, 1, 2, 4]);
// console.log(head);
console.log("L1:")
trans(L1)
console.log("L2:")
trans(L2)
console.log("L1 merge L2")
const resultList = mergeList(L1, L2)
trans(resultList)
