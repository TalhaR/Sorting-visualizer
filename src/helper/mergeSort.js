export default function getMergeAnimations(array) {
    const animations = [];
    const clone = [...array];
    mergeSort(clone, clone.slice(), 0, array.length - 1, animations);
    return animations;
}

function mergeSort(array, aux, start, end, animations) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(aux, array, start, mid, animations);
    mergeSort(aux, array, mid + 1, end, animations);
    merge(array, aux, start, mid, end, animations);
}

function merge(array, aux, start, mid, end, animations) {
    let index = start; 
    let leftPtr = start; 
    let rightPtr = mid + 1; 

    // go through left & right array up to ends of both
    while (leftPtr <= mid && rightPtr <= end) {
        animations.push([leftPtr, rightPtr])
        
        // pick the smallest element
        if (aux[leftPtr].props.height <= aux[rightPtr].props.height) {
            animations.push([index, aux[leftPtr]]);

            array[index++] = aux[leftPtr++];
        } else {
            animations.push([index, aux[rightPtr]]);

            array[index++] = aux[rightPtr++];
        }
    }

    // added remaining elements of left array
    while (leftPtr <= mid) {
        animations.push([leftPtr, leftPtr]);
        animations.push([index, aux[leftPtr]]);

        array[index++] = aux[leftPtr++];
    }

    // added remaining elements of right array
    while (rightPtr <= end) {
        animations.push([rightPtr, rightPtr]);
        animations.push([index, aux[rightPtr]]);
        
        array[index++] = aux[rightPtr++];
    }
}
