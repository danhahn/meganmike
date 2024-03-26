// IntersectionObserver interface (optional for type safety)
interface IntersectionObserverEntry {
	readonly boundingClientRect: DOMRectReadOnly;
	readonly intersectionRatio: number;
	readonly isIntersecting: boolean;
	readonly rootBounds: DOMRectReadOnly | null;
	readonly target: Element;
	readonly time: DOMHighResTimeStamp;
}

let intersectionObserver: IntersectionObserver;

function ensureIntersectionObserver(callBack: (entry: IntersectionObserverEntry) => void) {
	if (intersectionObserver) return;

	intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				callBack(entry);
			}
		});
	});
}

export default function viewport(
	element: Element,
	callBack: (entry: IntersectionObserverEntry) => void
): { destroy(): void } {
	ensureIntersectionObserver(callBack);

	intersectionObserver.observe(element);

	return {
		destroy() {
			if (intersectionObserver) {
				intersectionObserver.unobserve(element);
			}
		}
	};
}
