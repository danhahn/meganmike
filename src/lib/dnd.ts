export function draggable(node: HTMLElement, data: string) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handleDargStart(event: DragEvent) {
		if (event.dataTransfer) {
			event.dataTransfer.setData('text/plain', state);
		}
	}

	node.addEventListener('dragstart', handleDargStart);

	return {
		update(data: string) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handleDargStart);
		}
	};
}

type State = {
	dropEffect: 'copy' | 'move' | 'none' | 'link';
	dragOverClass: string;
	onDropZone: (data: string, tableNumber: number, event: any) => void;
	tableNumber: number;
};

export function dropZone(node: HTMLElement, options?: any) {
	let state: State = {
		dropEffect: 'move',
		dragOverClass: 'droppable',
		...options
	};

	function handleDragEnter(event: any) {
		if (event.target) {
			event.target.classList.add(state.dragOverClass);
		}
	}

	function handleDragLeave(event: DragEvent) {
		if (event.target instanceof HTMLElement) {
			event.target.classList.remove(state.dragOverClass);
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = state.dropEffect;
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer && event.target instanceof HTMLElement) {
			const data = event.dataTransfer.getData('text/plain');
			event.target.classList.remove(state.dragOverClass);
			state.onDropZone(data, state.tableNumber, event);
		}
	}

	node.addEventListener('dragenter', handleDragEnter);
	node.addEventListener('dragleave', handleDragLeave);
	node.addEventListener('dragover', handleDragOver);
	node.addEventListener('drop', handleDrop);
}
