package com.hnczb.admin.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public abstract class Providers {
	
	private static Map<Class<?>, Provider> providers = new HashMap<Class<?>, Provider>();
	
	public static void add(Provider instance) {
		providers.put(instance.getClass(), instance);
	}
	
	public static void reload() {
		reload(null);
	}
	
	public static void reload(Class<?> clazz) {
		if (clazz != null) {
			Provider provider = providers.get(clazz);
			if (provider != null)
				provider.reload();
		} else {
			Collection<Provider> c = providers.values();
			for (Provider p : c) {
				executor.execute(new Worker(p));
			}
		}
	}
	
	static class Worker implements Runnable {
		Provider p;
		Worker(Provider p) {
			this.p = p;
		}

		@Override
		public void run() {
			p.reload();
		}
	}
	
	private static ExecutorService executor = Executors.newCachedThreadPool();

	/**
     * @author Wu.Yanhong
     *
     */
    public abstract static class AbstractProvider implements Provider {

        protected final Logger log = LoggerFactory.getLogger(this.getClass());

        private AtomicBoolean loading = new AtomicBoolean();

        private AtomicBoolean initialized = new AtomicBoolean();

        /**
         * 如果数据还没准备好就等待加载数据，否则什么也不做.
         */
        protected void tryLoad() {
            if (!initialized.get() && !loading.getAndSet(true)) {
                reload();
            } else if (loading.get()) {
                log.debug("===>> Waitting for load data...");
                try {
                    synchronized (this) {
                        this.wait();
                    }
                } catch (InterruptedException e) {
                    log.warn(e.getMessage(), e);
                }
            }
        }

        @Override
        public void reload() {
            loading.set(true);

            log.debug("===>> Load data from database...");
            load();

            loading.set(false);
            initialized.set(true);

            synchronized (this) {
                this.notifyAll();
            }
        }

        /**
         * 加载数据的逻辑，由子类实现.
         */
        protected abstract void load();

        @Override
        public void clear() {}

    }
}
