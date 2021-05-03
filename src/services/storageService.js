import lscache from 'lscache';

if (process.env.NODE_ENV !== 'production') {
    lscache.enableWarnings(true);
}

const storage = {};

const lsCache = (action, key, data) => {
    if (lscache.supported()) {
        return lscache[action](key, data);
    } else {
        console.log('Local storage is not supported');
    }
};

storage.set = (key, data) => lsCache('set', key, data);

storage.get = key => lsCache('get', key);

storage.remove = key => lsCache('remove', key);

storage.flush = () => lsCache('flush');

export default storage;