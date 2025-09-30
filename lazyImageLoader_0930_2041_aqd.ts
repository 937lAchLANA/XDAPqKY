// 代码生成时间: 2025-09-30 20:41:41
 * It uses the Intersection Observer API to detect when images are in the viewport and then loads them.
 */

export class LazyImageLoader {
  private images: NodeListOf<HTMLImageElement>;
  private options: IntersectionObserverInit;
  private observer: IntersectionObserver;

  constructor(selector: string, options?: IntersectionObserverInit) {
    this.images = document.querySelectorAll(selector);
    this.options = { root: null, rootMargin: '0px', threshold: 0.1, ...options };
    this.observer = new IntersectionObserver(this.handleIntersect, this.options);

    // Attach observer to each image
    this.images.forEach(img => {
      this.observer.observe(img);
    });
  }

  /**
   * Handles the intersection of images with the viewport.
   * Loads the image when it's in the viewport.
   */
  private handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          observer.unobserve(img); // Stop observing the image once it's loaded
        } else {
          console.error('LazyImageLoader: Image does not have a data-src attribute.');
        }
      }
    });
  }

  /**
   * Destroy the observer to stop listening for intersections.
   */
  public destroy(): void {
    this.observer.disconnect();
  }
}

// Usage example with error handling:
try {
  const loader = new LazyImageLoader('img[data-src]', { rootMargin: '100px 0px' });
  // Do other things...
} catch (error) {
  console.error('Error initializing LazyImageLoader:', error);
}
