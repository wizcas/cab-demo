type HistoryAction = 'push' | 'replace';
interface HistoryState {
  action: HistoryAction;
  data: any;
  unused: string;
  url?: string | URL | null;
}
export type HistoryNotifyListener = (state: HistoryState) => void;
class HistoryNotifier {
  private readonly listeners: HistoryNotifyListener[] = [];
  listen(listener: HistoryNotifyListener) {
    const index = this.listeners.push(listener) - 1;
    return () => {
      this.listeners.splice(index, 1);
    };
  }
  notify(
    action: HistoryAction,
    data: any,
    unused: string,
    url?: string | URL | null
  ) {
    this.listeners.forEach((l) => l({ action, data, unused, url }));
  }
}
const historyNotifier = new HistoryNotifier();
export default historyNotifier;

// override the history operators for navigation injection
(function (history) {
  const pushState = history.pushState;
  const replaceState = history.replaceState;
  history.pushState = function (data, unused, url) {
    historyNotifier.notify('push', data, unused, url);
    return pushState.apply(history, [data, unused, url]);
  };
  history.replaceState = function (data, unused, url) {
    historyNotifier.notify('replace', data, unused, url);
    return replaceState.apply(history, [data, unused, url]);
  };
})(window.history);
