"use strict";
(self.webpackChunksuper_admin_app =
  self.webpackChunksuper_admin_app || []).push([
  [179],
  {
    552: () => {
      function he(e) {
        return "function" == typeof e;
      }
      function Mo(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ya = Mo(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function vi(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Lt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (he(r))
              try {
                r();
              } catch (o) {
                t = o instanceof ya ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  Yg(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ya ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ya(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Yg(t);
            else {
              if (t instanceof Lt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && vi(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && vi(n, t), t instanceof Lt && t._removeParent(this);
        }
      }
      Lt.EMPTY = (() => {
        const e = new Lt();
        return (e.closed = !0), e;
      })();
      const Qg = Lt.EMPTY;
      function Zg(e) {
        return (
          e instanceof Lt ||
          (e && "closed" in e && he(e.remove) && he(e.add) && he(e.unsubscribe))
        );
      }
      function Yg(e) {
        he(e) ? e() : e.unsubscribe();
      }
      const Vr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        va = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = va;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = va;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Xg(e) {
        va.setTimeout(() => {
          const { onUnhandledError: t } = Vr;
          if (!t) throw e;
          t(e);
        });
      }
      function _a() {}
      const IT = _c("C", void 0, void 0);
      function _c(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let jr = null;
      function Da(e) {
        if (Vr.useDeprecatedSynchronousErrorHandling) {
          const t = !jr;
          if ((t && (jr = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = jr;
            if (((jr = null), n)) throw r;
          }
        } else e();
      }
      class Dc extends Lt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Zg(t) && t.add(this))
              : (this.destination = FT);
        }
        static create(t, n, r) {
          return new To(t, n, r);
        }
        next(t) {
          this.isStopped
            ? wc(
                (function RT(e) {
                  return _c("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? wc(
                (function AT(e) {
                  return _c("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? wc(IT, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const OT = Function.prototype.bind;
      function Cc(e, t) {
        return OT.call(e, t);
      }
      class NT {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ca(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ca(r);
            }
          else Ca(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ca(n);
            }
        }
      }
      class To extends Dc {
        constructor(t, n, r) {
          let i;
          if ((super(), he(t) || !t))
            i = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let o;
            this && Vr.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && Cc(t.next, o),
                  error: t.error && Cc(t.error, o),
                  complete: t.complete && Cc(t.complete, o),
                }))
              : (i = t);
          }
          this.destination = new NT(i);
        }
      }
      function Ca(e) {
        Vr.useDeprecatedSynchronousErrorHandling
          ? (function PT(e) {
              Vr.useDeprecatedSynchronousErrorHandling &&
                jr &&
                ((jr.errorThrown = !0), (jr.error = e));
            })(e)
          : Xg(e);
      }
      function wc(e, t) {
        const { onStoppedNotification: n } = Vr;
        n && va.setTimeout(() => n(e, t));
      }
      const FT = {
          closed: !0,
          next: _a,
          error: function xT(e) {
            throw e;
          },
          complete: _a,
        },
        Ec =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function $n(e) {
        return e;
      }
      function Jg(e) {
        return 0 === e.length
          ? $n
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, i) => i(r), n);
            };
      }
      let De = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function VT(e) {
              return (
                (e && e instanceof Dc) ||
                ((function LT(e) {
                  return e && he(e.next) && he(e.error) && he(e.complete);
                })(e) &&
                  Zg(e))
              );
            })(n)
              ? n
              : new To(n, r, i);
            return (
              Da(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = em(r))((i, o) => {
              const s = new To({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ec]() {
            return this;
          }
          pipe(...n) {
            return Jg(n)(this);
          }
          toPromise(n) {
            return new (n = em(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function em(e) {
        var t;
        return null !== (t = e ?? Vr.Promise) && void 0 !== t ? t : Promise;
      }
      const jT = Mo(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let ke = (() => {
        class e extends De {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new tm(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new jT();
          }
          next(n) {
            Da(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Da(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Da(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i
              ? Qg
              : ((this.currentObservers = null),
                o.push(n),
                new Lt(() => {
                  (this.currentObservers = null), vi(o, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new De();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new tm(t, n)), e;
      })();
      class tm extends ke {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Qg;
        }
      }
      class rt extends ke {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function nm(e) {
        return he(e?.lift);
      }
      function Me(e) {
        return (t) => {
          if (nm(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function ve(e, t, n, r, i) {
        return new rm(e, t, n, r, i);
      }
      class rm extends Dc {
        constructor(t, n, r, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function te(e, t) {
        return Me((n, r) => {
          let i = 0;
          n.subscribe(
            ve(r, (o) => {
              r.next(e.call(t, o, i++));
            })
          );
        });
      }
      function yr(e) {
        return this instanceof yr ? ((this.v = e), this) : new yr(e);
      }
      function am(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Tc(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function i(o, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    o({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      const lm = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function um(e) {
        return he(e?.then);
      }
      function cm(e) {
        return he(e[Ec]);
      }
      function dm(e) {
        return Symbol.asyncIterator && he(e?.[Symbol.asyncIterator]);
      }
      function fm(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const hm = (function iI() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function pm(e) {
        return he(e?.[hm]);
      }
      function gm(e) {
        return (function sm(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var i,
            r = n.apply(e, t || []),
            o = [];
          return (
            (i = {}),
            s("next"),
            s("throw"),
            s("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function s(f) {
            r[f] &&
              (i[f] = function (h) {
                return new Promise(function (p, g) {
                  o.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof yr
                  ? Promise.resolve(f.value.v).then(u, c)
                  : d(o[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(o[0][3], p);
            }
          }
          function u(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield yr(n.read());
              if (i) return yield yr(void 0);
              yield yield yr(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function mm(e) {
        return he(e?.getReader);
      }
      function ot(e) {
        if (e instanceof De) return e;
        if (null != e) {
          if (cm(e))
            return (function oI(e) {
              return new De((t) => {
                const n = e[Ec]();
                if (he(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (lm(e))
            return (function sI(e) {
              return new De((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (um(e))
            return (function aI(e) {
              return new De((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Xg);
              });
            })(e);
          if (dm(e)) return ym(e);
          if (pm(e))
            return (function lI(e) {
              return new De((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (mm(e))
            return (function uI(e) {
              return ym(gm(e));
            })(e);
        }
        throw fm(e);
      }
      function ym(e) {
        return new De((t) => {
          (function cI(e, t) {
            var n, r, i, o;
            return (function im(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = am(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function zn(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function qe(e, t, n = 1 / 0) {
        return he(t)
          ? qe((r, i) => te((o, s) => t(r, o, i, s))(ot(e(r, i))), n)
          : ("number" == typeof t && (n = t),
            Me((r, i) =>
              (function dI(e, t, n, r, i, o, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (g) => (u < r ? p(g) : l.push(g)),
                  p = (g) => {
                    o && t.next(g), u++;
                    let m = !1;
                    ot(n(g, c++)).subscribe(
                      ve(
                        t,
                        (C) => {
                          i?.(C), o ? h(C) : t.next(C);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (u--; l.length && u < r; ) {
                                const C = l.shift();
                                s ? zn(t, s, () => p(C)) : p(C);
                              }
                              f();
                            } catch (C) {
                              t.error(C);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    ve(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, i, e, n)
            ));
      }
      function _i(e = 1 / 0) {
        return qe($n, e);
      }
      const an = new De((e) => e.complete());
      function Ic(e) {
        return e[e.length - 1];
      }
      function Ac(e) {
        return he(Ic(e)) ? e.pop() : void 0;
      }
      function Io(e) {
        return (function hI(e) {
          return e && he(e.schedule);
        })(Ic(e))
          ? e.pop()
          : void 0;
      }
      function Rc(e, t = 0) {
        return Me((n, r) => {
          n.subscribe(
            ve(
              r,
              (i) => zn(r, e, () => r.next(i), t),
              () => zn(r, e, () => r.complete(), t),
              (i) => zn(r, e, () => r.error(i), t)
            )
          );
        });
      }
      function vm(e, t = 0) {
        return Me((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function _m(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new De((n) => {
          zn(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            zn(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function We(e, t) {
        return t
          ? (function DI(e, t) {
              if (null != e) {
                if (cm(e))
                  return (function gI(e, t) {
                    return ot(e).pipe(vm(t), Rc(t));
                  })(e, t);
                if (lm(e))
                  return (function yI(e, t) {
                    return new De((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (um(e))
                  return (function mI(e, t) {
                    return ot(e).pipe(vm(t), Rc(t));
                  })(e, t);
                if (dm(e)) return _m(e, t);
                if (pm(e))
                  return (function vI(e, t) {
                    return new De((n) => {
                      let r;
                      return (
                        zn(n, t, () => {
                          (r = e[hm]()),
                            zn(
                              n,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => he(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (mm(e))
                  return (function _I(e, t) {
                    return _m(gm(e), t);
                  })(e, t);
              }
              throw fm(e);
            })(e, t)
          : ot(e);
      }
      function Pc(...e) {
        const t = Io(e),
          n = (function pI(e, t) {
            return "number" == typeof Ic(e) ? e.pop() : t;
          })(e, 1 / 0),
          r = e;
        return r.length ? (1 === r.length ? ot(r[0]) : _i(n)(We(r, t))) : an;
      }
      function H(...e) {
        return We(e, Io(e));
      }
      function Dm(e = {}) {
        const {
          connector: t = () => new ke(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: i = !0,
        } = e;
        return (o) => {
          let s,
            a,
            l,
            u = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (c = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Me((g, m) => {
            u++, !d && !c && f();
            const C = (l = l ?? t());
            m.add(() => {
              u--, 0 === u && !d && !c && (a = Oc(p, i));
            }),
              C.subscribe(m),
              !s &&
                u > 0 &&
                ((s = new To({
                  next: (y) => C.next(y),
                  error: (y) => {
                    (d = !0), f(), (a = Oc(h, n, y)), C.error(y);
                  },
                  complete: () => {
                    (c = !0), f(), (a = Oc(h, r)), C.complete();
                  },
                })),
                ot(g).subscribe(s));
          })(o);
        };
      }
      function Oc(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new To({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return ot(t(...n)).subscribe(r);
      }
      function Vt(e, t) {
        return Me((n, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          n.subscribe(
            ve(
              r,
              (l) => {
                i?.unsubscribe();
                let u = 0;
                const c = o++;
                ot(e(l, c)).subscribe(
                  (i = ve(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Cm(e, t = $n) {
        return (
          (e = e ?? CI),
          Me((n, r) => {
            let i,
              o = !0;
            n.subscribe(
              ve(r, (s) => {
                const a = t(s);
                (o || !e(i, a)) && ((o = !1), (i = a), r.next(s));
              })
            );
          })
        );
      }
      function CI(e, t) {
        return e === t;
      }
      function pe(e) {
        for (let t in e) if (e[t] === pe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function wa(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function Ke(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Ke).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Nc(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const wI = pe({ __forward_ref__: pe });
      function Ce(e) {
        return (
          (e.__forward_ref__ = Ce),
          (e.toString = function () {
            return Ke(this());
          }),
          e
        );
      }
      function W(e) {
        return xc(e) ? e() : e;
      }
      function xc(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(wI) &&
          e.__forward_ref__ === Ce
        );
      }
      function Fc(e) {
        return e && !!e.ɵproviders;
      }
      const wm = "https://g.co/ng/security#xss";
      class v extends Error {
        constructor(t, n) {
          super(
            (function Ea(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function Q(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ba(e, t) {
        throw new v(-201, !1);
      }
      function Yt(e, t) {
        null == e &&
          (function ce(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function O(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Ae(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Sa(e) {
        return Em(e, Ma) || Em(e, Sm);
      }
      function Em(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function bm(e) {
        return e && (e.hasOwnProperty(kc) || e.hasOwnProperty(RI))
          ? e[kc]
          : null;
      }
      const Ma = pe({ ɵprov: pe }),
        kc = pe({ ɵinj: pe }),
        Sm = pe({ ngInjectableDef: pe }),
        RI = pe({ ngInjectorDef: pe });
      var U = (() => (
        ((U = U || {})[(U.Default = 0)] = "Default"),
        (U[(U.Host = 1)] = "Host"),
        (U[(U.Self = 2)] = "Self"),
        (U[(U.SkipSelf = 4)] = "SkipSelf"),
        (U[(U.Optional = 8)] = "Optional"),
        U
      ))();
      let Lc;
      function Mm() {
        return Lc;
      }
      function Ct(e) {
        const t = Lc;
        return (Lc = e), t;
      }
      function Tm(e, t, n) {
        const r = Sa(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & U.Optional
          ? null
          : void 0 !== t
          ? t
          : void ba(Ke(e));
      }
      const we = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Ao = {},
        Vc = "__NG_DI_FLAG__",
        Ta = "ngTempTokenPath",
        OI = /\n/gm,
        Im = "__source";
      let Di;
      function _r(e) {
        const t = Di;
        return (Di = e), t;
      }
      function FI(e, t = U.Default) {
        if (void 0 === Di) throw new v(-203, !1);
        return null === Di
          ? Tm(e, void 0, t)
          : Di.get(e, t & U.Optional ? null : void 0, t);
      }
      function w(e, t = U.Default) {
        return (Mm() || FI)(W(e), t);
      }
      function M(e, t = U.Default) {
        return w(e, Ia(t));
      }
      function Ia(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function jc(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = W(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new v(900, !1);
            let i,
              o = U.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = kI(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (o |= l)
                : (i = a);
            }
            t.push(w(i, o));
          } else t.push(w(r));
        }
        return t;
      }
      function Ro(e, t) {
        return (e[Vc] = t), (e.prototype[Vc] = t), e;
      }
      function kI(e) {
        return e[Vc];
      }
      function Gn(e) {
        return { toString: e }.toString();
      }
      var Cn = (() => (
          ((Cn = Cn || {})[(Cn.OnPush = 0)] = "OnPush"),
          (Cn[(Cn.Default = 1)] = "Default"),
          Cn
        ))(),
        wt = (() => {
          return (
            ((e = wt || (wt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            wt
          );
          var e;
        })();
      const wn = {},
        se = [],
        Aa = pe({ ɵcmp: pe }),
        Uc = pe({ ɵdir: pe }),
        Bc = pe({ ɵpipe: pe }),
        Rm = pe({ ɵmod: pe }),
        qn = pe({ ɵfac: pe }),
        Po = pe({ __NG_ELEMENT_ID__: pe }),
        Pm = pe({ __NG_ENV_ID__: pe });
      function Om(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      function Hc(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, o);
          } else {
            const o = i,
              s = n[++r];
            xm(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
          }
        }
        return r;
      }
      function Nm(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function xm(e) {
        return 64 === e.charCodeAt(0);
      }
      function Oo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  Fm(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Fm(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      const km = "ng-template";
      function jI(e, t, n) {
        let r = 0,
          i = !0;
        for (; r < e.length; ) {
          let o = e[r++];
          if ("string" == typeof o && i) {
            const s = e[r++];
            if (n && "class" === o && -1 !== Om(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; r < e.length && "string" == typeof (o = e[r++]); )
                if (o.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof o && (i = !1);
          }
        }
        return !1;
      }
      function Lm(e) {
        return 4 === e.type && e.value !== km;
      }
      function UI(e, t, n) {
        return t === (4 !== e.type || n ? e.value : km);
      }
      function BI(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function zI(e) {
            for (let t = 0; t < e.length; t++) if (Nm(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !UI(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (ln(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!jI(e.attrs, u, n)) {
                    if (ln(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = HI(8 & r ? "class" : l, i, Lm(e), n);
                if (-1 === d) {
                  if (ln(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Om(h, u, 0)) || (2 & r && u !== f)) {
                    if (ln(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !ln(r) && !ln(l)) return !1;
            if (s && ln(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return ln(r) || s;
      }
      function ln(e) {
        return 0 == (1 & e);
      }
      function HI(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function GI(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Vm(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (BI(e, t[r], n)) return !0;
        return !1;
      }
      function jm(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function WI(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !ln(s) && ((t += jm(o, i)), (i = "")),
              (r = s),
              (o = o || !ln(r));
          n++;
        }
        return "" !== i && (t += jm(o, i)), t;
      }
      function un(e) {
        return Gn(() => {
          const t = Bm(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Cn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || wt.Emulated,
              styles: e.styles || se,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          Hm(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Ra(r, !1)),
            (n.pipeDefs = Ra(r, !0)),
            (n.id = (function tA(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const i of n) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function YI(e) {
        return ae(e) || st(e);
      }
      function XI(e) {
        return null !== e;
      }
      function xe(e) {
        return Gn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || se,
          declarations: e.declarations || se,
          imports: e.imports || se,
          exports: e.exports || se,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Um(e, t) {
        if (null == e) return wn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o);
          }
        return n;
      }
      function G(e) {
        return Gn(() => {
          const t = Bm(e);
          return Hm(t), t;
        });
      }
      function Et(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function ae(e) {
        return e[Aa] || null;
      }
      function st(e) {
        return e[Uc] || null;
      }
      function bt(e) {
        return e[Bc] || null;
      }
      function Ut(e, t) {
        const n = e[Rm] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${Ke(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Bm(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || wn,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || se,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Um(e.inputs, t),
          outputs: Um(e.outputs),
        };
      }
      function Hm(e) {
        e.features?.forEach((t) => t(e));
      }
      function Ra(e, t) {
        if (!e) return null;
        const n = t ? bt : YI;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(XI);
      }
      const Qe = 0,
        x = 1,
        Z = 2,
        Re = 3,
        cn = 4,
        No = 5,
        at = 6,
        wi = 7,
        je = 8,
        Ei = 9,
        Ur = 10,
        Y = 11,
        xo = 12,
        $m = 13,
        bi = 14,
        Ue = 15,
        Fo = 16,
        Si = 17,
        En = 18,
        ko = 19,
        zm = 20,
        Dr = 21,
        Wn = 22,
        Pa = 23,
        Oa = 24,
        re = 25,
        $c = 1,
        Gm = 2,
        bn = 7,
        Mi = 9,
        lt = 11;
      function Bt(e) {
        return Array.isArray(e) && "object" == typeof e[$c];
      }
      function St(e) {
        return Array.isArray(e) && !0 === e[$c];
      }
      function zc(e) {
        return 0 != (4 & e.flags);
      }
      function Br(e) {
        return e.componentOffset > -1;
      }
      function xa(e) {
        return 1 == (1 & e.flags);
      }
      function dn(e) {
        return !!e.template;
      }
      function Gc(e) {
        return 0 != (512 & e[Z]);
      }
      function Hr(e, t) {
        return e.hasOwnProperty(qn) ? e[qn] : null;
      }
      const Km = Symbol("SIGNAL");
      function qc(e, t, n = {}) {
        return (t[Km] = e), Object.assign(t, n);
      }
      function Qm(e, t) {
        return (null === e || "object" != typeof e) && Object.is(e, t);
      }
      let aA =
          we.WeakRef ??
          class sA {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        uA = 0,
        Sn = null,
        Fa = !1;
      function et(e) {
        const t = Sn;
        return (Sn = e), t;
      }
      class ka {
        constructor() {
          (this.id = uA++),
            (this.ref = (function lA(e) {
              return new aA(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, n] of this.producers) {
            const r = n.producerNode.deref();
            if (void 0 !== r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(t), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = Fa;
          Fa = !0;
          try {
            for (const [n, r] of this.consumers) {
              const i = r.consumerNode.deref();
              void 0 !== i && i.trackingVersion === r.atTrackingVersion
                ? i.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), i?.producers.delete(this.id));
            }
          } finally {
            Fa = t;
          }
        }
        producerAccessed() {
          if (Fa) throw new Error("");
          if (null === Sn) return;
          let t = Sn.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: Sn.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: Sn.trackingVersion,
              }),
              Sn.producers.set(this.id, t),
              this.consumers.set(Sn.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = Sn.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== Sn?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      function Zm(e, t) {
        const n = new cA(e, t?.equal ?? Qm);
        return qc(n, n.signal.bind(n));
      }
      const Wc = Symbol("UNSET"),
        Kc = Symbol("COMPUTING"),
        La = Symbol("ERRORED");
      class cA extends ka {
        constructor(t, n) {
          super(),
            (this.computation = t),
            (this.equal = n),
            (this.value = Wc),
            (this.error = null),
            (this.stale = !0),
            (this.consumerAllowSignalWrites = !1);
        }
        onConsumerDependencyMayHaveChanged() {
          this.stale || ((this.stale = !0), this.producerMayHaveChanged());
        }
        onProducerUpdateValueVersion() {
          if (this.stale) {
            if (
              this.value !== Wc &&
              this.value !== Kc &&
              !this.consumerPollProducersForChange()
            )
              return void (this.stale = !1);
            this.recomputeValue();
          }
        }
        recomputeValue() {
          if (this.value === Kc)
            throw new Error("Detected cycle in computations.");
          const t = this.value;
          (this.value = Kc), this.trackingVersion++;
          const n = et(this);
          let r;
          try {
            r = this.computation();
          } catch (i) {
            (r = La), (this.error = i);
          } finally {
            et(n);
          }
          (this.stale = !1),
            t !== Wc && t !== La && r !== La && this.equal(t, r)
              ? (this.value = t)
              : ((this.value = r), this.valueVersion++);
        }
        signal() {
          if (
            (this.onProducerUpdateValueVersion(),
            this.producerAccessed(),
            this.value === La)
          )
            throw this.error;
          return this.value;
        }
      }
      let Ym = function dA() {
        throw new Error();
      };
      function Qc() {
        Ym();
      }
      class hA extends ka {
        constructor(t, n) {
          super(),
            (this.value = t),
            (this.equal = n),
            (this.consumerAllowSignalWrites = !1);
        }
        onConsumerDependencyMayHaveChanged() {}
        onProducerUpdateValueVersion() {}
        set(t) {
          this.producerUpdatesAllowed || Qc(),
            this.equal(this.value, t) ||
              ((this.value = t),
              this.valueVersion++,
              this.producerMayHaveChanged());
        }
        update(t) {
          this.producerUpdatesAllowed || Qc(), this.set(t(this.value));
        }
        mutate(t) {
          this.producerUpdatesAllowed || Qc(),
            t(this.value),
            this.valueVersion++,
            this.producerMayHaveChanged();
        }
        asReadonly() {
          return (
            void 0 === this.readonlySignal &&
              (this.readonlySignal = qc(this, () => this.signal())),
            this.readonlySignal
          );
        }
        signal() {
          return this.producerAccessed(), this.value;
        }
      }
      function Jm(e) {
        const t = et(null);
        try {
          return e();
        } finally {
          et(t);
        }
      }
      const ey = () => {};
      class pA extends ka {
        constructor(t, n, r) {
          super(),
            (this.watch = t),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = ey),
            (this.registerOnCleanup = (i) => {
              this.cleanupFn = i;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = et(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = ey),
              this.watch(this.registerOnCleanup);
          } finally {
            et(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class gA {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Xt() {
        return ty;
      }
      function ty(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = yA), mA;
      }
      function mA() {
        const e = ry(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === wn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function yA(e, t, n, r) {
        const i = this.declaredInputs[n],
          o =
            ry(e) ||
            (function vA(e, t) {
              return (e[ny] = t);
            })(e, { previous: wn, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[i];
        (s[i] = new gA(l && l.currentValue, t, a === wn)), (e[r] = t);
      }
      Xt.ngInherit = !0;
      const ny = "__ngSimpleChanges__";
      function ry(e) {
        return e[ny] || null;
      }
      const Mn = function (e, t, n) {};
      function be(e) {
        for (; Array.isArray(e); ) e = e[Qe];
        return e;
      }
      function ja(e, t) {
        return be(t[e]);
      }
      function Mt(e, t) {
        return be(t[e.index]);
      }
      function sy(e, t) {
        return e.data[t];
      }
      function Ht(e, t) {
        const n = t[e];
        return Bt(n) ? n : n[Qe];
      }
      function Cr(e, t) {
        return null == t ? null : e[t];
      }
      function ay(e) {
        e[Si] = 0;
      }
      function SA(e) {
        1024 & e[Z] || ((e[Z] |= 1024), uy(e, 1));
      }
      function ly(e) {
        1024 & e[Z] && ((e[Z] &= -1025), uy(e, -1));
      }
      function uy(e, t) {
        let n = e[Re];
        if (null === n) return;
        n[No] += t;
        let r = n;
        for (
          n = n[Re];
          null !== n && ((1 === t && 1 === r[No]) || (-1 === t && 0 === r[No]));

        )
          (n[No] += t), (r = n), (n = n[Re]);
      }
      function cy(e, t) {
        if (256 == (256 & e[Z])) throw new v(911, !1);
        null === e[Dr] && (e[Dr] = []), e[Dr].push(t);
      }
      const q = {
        lFrame: Dy(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function fy() {
        return q.bindingsEnabled;
      }
      function b() {
        return q.lFrame.lView;
      }
      function ie() {
        return q.lFrame.tView;
      }
      function Tt(e) {
        return (q.lFrame.contextLView = e), e[je];
      }
      function It(e) {
        return (q.lFrame.contextLView = null), e;
      }
      function it() {
        let e = hy();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function hy() {
        return q.lFrame.currentTNode;
      }
      function Tn(e, t) {
        const n = q.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Yc() {
        return q.lFrame.isParent;
      }
      function Xc() {
        q.lFrame.isParent = !1;
      }
      function pt() {
        const e = q.lFrame;
        let t = e.bindingRootIndex;
        return (
          -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
        );
      }
      function Ai() {
        return q.lFrame.bindingIndex++;
      }
      function Qn(e) {
        const t = q.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function LA(e, t) {
        const n = q.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Jc(t);
      }
      function Jc(e) {
        q.lFrame.currentDirectiveIndex = e;
      }
      function ed(e) {
        const t = q.lFrame.currentDirectiveIndex;
        return -1 === t ? null : e[t];
      }
      function yy() {
        return q.lFrame.currentQueryIndex;
      }
      function td(e) {
        q.lFrame.currentQueryIndex = e;
      }
      function jA(e) {
        const t = e[x];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[at] : null;
      }
      function vy(e, t, n) {
        if (n & U.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & U.Host ||
              ((i = jA(o)), null === i || ((o = o[bi]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = (q.lFrame = _y());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function nd(e) {
        const t = _y(),
          n = e[x];
        (q.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function _y() {
        const e = q.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Dy(e) : t;
      }
      function Dy(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Cy() {
        const e = q.lFrame;
        return (
          (q.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const wy = Cy;
      function rd() {
        const e = Cy();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function gt() {
        return q.lFrame.selectedIndex;
      }
      function $r(e) {
        q.lFrame.selectedIndex = e;
      }
      function Pe() {
        const e = q.lFrame;
        return sy(e.tView, e.selectedIndex);
      }
      let by = !0;
      function Ua() {
        return by;
      }
      function wr(e) {
        by = e;
      }
      function Ba(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = o;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            l && (e.viewHooks ??= []).push(-n, l),
            u &&
              ((e.viewHooks ??= []).push(n, u),
              (e.viewCheckHooks ??= []).push(n, u)),
            null != c && (e.destroyHooks ??= []).push(n, c);
        }
      }
      function Ha(e, t, n) {
        Sy(e, t, 3, n);
      }
      function $a(e, t, n, r) {
        (3 & e[Z]) === n && Sy(e, t, n, r);
      }
      function id(e, t) {
        let n = e[Z];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[Z] = n));
      }
      function Sy(e, t, n, r) {
        const o = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[Si] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[Si] += 65536),
              (a < o || -1 == o) &&
                (WA(e, n, t, l), (e[Si] = (4294901760 & e[Si]) + l + 2)),
              l++;
      }
      function My(e, t) {
        Mn(4, e, t);
        const n = et(null);
        try {
          t.call(e);
        } finally {
          et(n), Mn(5, e, t);
        }
      }
      function WA(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        i
          ? e[Z] >> 13 < e[Si] >> 16 &&
            (3 & e[Z]) === t &&
            ((e[Z] += 8192), My(a, o))
          : My(a, o);
      }
      const Ri = -1;
      class jo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ty(e) {
        return e !== Ri;
      }
      function za(e) {
        return 32767 & e;
      }
      function Ga(e, t) {
        let n = (function YA(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[bi]), n--;
        return r;
      }
      let sd = !0;
      function qa(e) {
        const t = sd;
        return (sd = e), t;
      }
      const Iy = 255,
        Ay = 5;
      let XA = 0;
      const In = {};
      function Wa(e, t) {
        const n = Ry(e, t);
        if (-1 !== n) return n;
        const r = t[x];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          ad(r.data, e),
          ad(t, null),
          ad(r.blueprint, null));
        const i = ld(e, t),
          o = e.injectorIndex;
        if (Ty(i)) {
          const s = za(i),
            a = Ga(i, t),
            l = a[x].data;
          for (let u = 0; u < 8; u++) t[o + u] = a[s + u] | l[s + u];
        }
        return (t[o + 8] = i), o;
      }
      function ad(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Ry(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ld(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          if (((r = Ly(i)), null === r)) return Ri;
          if ((n++, (i = i[bi]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Ri;
      }
      function ud(e, t, n) {
        !(function JA(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Po) && (r = n[Po]),
            null == r && (r = n[Po] = XA++);
          const i = r & Iy;
          t.data[e + (i >> Ay)] |= 1 << i;
        })(e, t, n);
      }
      function Py(e, t, n) {
        if (n & U.Optional || void 0 !== e) return e;
        ba();
      }
      function Oy(e, t, n, r) {
        if (
          (n & U.Optional && void 0 === r && (r = null),
          !(n & (U.Self | U.Host)))
        ) {
          const i = e[Ei],
            o = Ct(void 0);
          try {
            return i ? i.get(t, r, n & U.Optional) : Tm(t, r, n & U.Optional);
          } finally {
            Ct(o);
          }
        }
        return Py(r, 0, n);
      }
      function Ny(e, t, n, r = U.Default, i) {
        if (null !== e) {
          if (2048 & t[Z] && !(r & U.Self)) {
            const s = (function iR(e, t, n, r, i) {
              let o = e,
                s = t;
              for (
                ;
                null !== o && null !== s && 2048 & s[Z] && !(512 & s[Z]);

              ) {
                const a = xy(o, s, n, r | U.Self, In);
                if (a !== In) return a;
                let l = o.parent;
                if (!l) {
                  const u = s[zm];
                  if (u) {
                    const c = u.get(n, In, r);
                    if (c !== In) return c;
                  }
                  (l = Ly(s)), (s = s[bi]);
                }
                o = l;
              }
              return i;
            })(e, t, n, r, In);
            if (s !== In) return s;
          }
          const o = xy(e, t, n, r, In);
          if (o !== In) return o;
        }
        return Oy(t, n, r, i);
      }
      function xy(e, t, n, r, i) {
        const o = (function nR(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Po) ? e[Po] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Iy : rR) : t;
        })(n);
        if ("function" == typeof o) {
          if (!vy(t, e, r)) return r & U.Host ? Py(i, 0, r) : Oy(t, n, r, i);
          try {
            const s = o(r);
            if (null != s || r & U.Optional) return s;
            ba();
          } finally {
            wy();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = Ry(e, t),
            l = Ri,
            u = r & U.Host ? t[Ue][at] : null;
          for (
            (-1 === a || r & U.SkipSelf) &&
            ((l = -1 === a ? ld(e, t) : t[a + 8]),
            l !== Ri && ky(r, !1)
              ? ((s = t[x]), (a = za(l)), (t = Ga(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[x];
            if (Fy(o, a, c.data)) {
              const d = tR(a, t, n, s, r, u);
              if (d !== In) return d;
            }
            (l = t[a + 8]),
              l !== Ri && ky(r, t[x].data[a + 8] === u) && Fy(o, a, t)
                ? ((s = c), (a = za(l)), (t = Ga(l, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function tR(e, t, n, r, i, o) {
        const s = t[x],
          a = s.data[e + 8],
          c = Ka(
            a,
            s,
            n,
            null == r ? Br(a) && sd : r != s && 0 != (3 & a.type),
            i & U.Host && o === a
          );
        return null !== c ? zr(t, s, c, a) : In;
      }
      function Ka(e, t, n, r, i) {
        const o = e.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          l = e.directiveStart,
          c = o >> 20,
          f = i ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < l && n === p) || (h >= l && p.type === n)) return h;
        }
        if (i) {
          const h = s[l];
          if (h && dn(h) && h.type === n) return l;
        }
        return null;
      }
      function zr(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function KA(e) {
            return e instanceof jo;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function EI(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new v(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function ue(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : Q(e);
              })(o[n])
            );
          const a = qa(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Ct(s.injectImpl) : null;
          vy(e, r, U.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function qA(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (r) {
                    const s = ty(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  i && (n.preOrderHooks ??= []).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks ??= []).push(e, o),
                      (n.preOrderCheckHooks ??= []).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== l && Ct(l), qa(a), (s.resolving = !1), wy();
          }
        }
        return i;
      }
      function Fy(e, t, n) {
        return !!(n[t + (e >> Ay)] & (1 << e));
      }
      function ky(e, t) {
        return !(e & U.Self || (e & U.Host && t));
      }
      class Pi {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Ny(this._tNode, this._lView, t, Ia(r), n);
        }
      }
      function rR() {
        return new Pi(it(), b());
      }
      function tt(e) {
        return Gn(() => {
          const t = e.prototype.constructor,
            n = t[qn] || cd(t),
            r = Object.prototype;
          let i = Object.getPrototypeOf(e.prototype).constructor;
          for (; i && i !== r; ) {
            const o = i[qn] || cd(i);
            if (o && o !== n) return o;
            i = Object.getPrototypeOf(i);
          }
          return (o) => new o();
        });
      }
      function cd(e) {
        return xc(e)
          ? () => {
              const t = cd(W(e));
              return t && t();
            }
          : Hr(e);
      }
      function Ly(e) {
        const t = e[x],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[at] : null;
      }
      const Ni = "__parameters__";
      function Fi(e, t, n) {
        return Gn(() => {
          const r = (function dd(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Ni)
                ? l[Ni]
                : Object.defineProperty(l, Ni, { value: [] })[Ni];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      function Ho(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Ho(n, t) : t(n)));
      }
      function jy(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Za(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function $t(e, t, n) {
        let r = ki(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function uR(e, t, n, r) {
                let i = e.length;
                if (i == t) e.push(n, r);
                else if (1 === i) e.push(r, e[0]), (e[0] = n);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; )
                    (e[i] = e[i - 2]), i--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function fd(e, t) {
        const n = ki(e, t);
        if (n >= 0) return e[1 | n];
      }
      function ki(e, t) {
        return (function Uy(e, t, n) {
          let r = 0,
            i = e.length >> n;
          for (; i !== r; ) {
            const o = r + ((i - r) >> 1),
              s = e[o << n];
            if (t === s) return o << n;
            s > t ? (i = o) : (r = o + 1);
          }
          return ~(i << n);
        })(e, t, 1);
      }
      const pd = Ro(
          Fi("Inject", (e) => ({ token: e })),
          -1
        ),
        Xa = Ro(Fi("Optional"), 8),
        Ja = Ro(Fi("SkipSelf"), 4);
      function rl(e) {
        return 128 == (128 & e.flags);
      }
      var At = (() => (
        ((At = At || {})[(At.Important = 1)] = "Important"),
        (At[(At.DashCase = 2)] = "DashCase"),
        At
      ))();
      const AR = /^>|^->|<!--|-->|--!>|<!-$/g,
        RR = /(<|>)/,
        PR = "\u200b$1\u200b";
      const _d = new Map();
      let OR = 0;
      const Cd = "__ngContext__";
      function ut(e, t) {
        Bt(t)
          ? ((e[Cd] = t[ko]),
            (function xR(e) {
              _d.set(e[ko], e);
            })(t))
          : (e[Cd] = t);
      }
      let wd;
      function Ed(e, t) {
        return wd(e, t);
      }
      function qo(e) {
        const t = e[Re];
        return St(t) ? t[Re] : t;
      }
      function sv(e) {
        return lv(e[xo]);
      }
      function av(e) {
        return lv(e[cn]);
      }
      function lv(e) {
        for (; null !== e && !St(e); ) e = e[cn];
        return e;
      }
      function ji(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          St(r) ? (o = r) : Bt(r) && ((s = !0), (r = r[Qe]));
          const a = be(r);
          0 === e && null !== n
            ? null == i
              ? hv(t, n, a)
              : Gr(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? Gr(t, n, a, i || null, !0)
            : 2 === e
            ? (function ul(e, t, n) {
                const r = al(e, t);
                r &&
                  (function JR(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function nP(e, t, n, r, i) {
                const o = n[bn];
                o !== be(n) && ji(t, e, r, o, i);
                for (let a = lt; a < n.length; a++) {
                  const l = n[a];
                  Ko(l[x], l, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function bd(e, t) {
        return e.createComment(
          (function Xy(e) {
            return e.replace(AR, (t) => t.replace(RR, PR));
          })(t)
        );
      }
      function sl(e, t, n) {
        return e.createElement(t, n);
      }
      function cv(e, t) {
        const n = e[Mi],
          r = n.indexOf(t);
        ly(t), n.splice(r, 1);
      }
      function Sd(e, t) {
        if (e.length <= lt) return;
        const n = lt + t,
          r = e[n];
        if (r) {
          const i = r[Fo];
          null !== i && i !== e && cv(i, r), t > 0 && (e[n - 1][cn] = r[cn]);
          const o = Za(e, lt + t);
          !(function GR(e, t) {
            Ko(e, t, t[Y], 2, null, null), (t[Qe] = null), (t[at] = null);
          })(r[x], r);
          const s = o[En];
          null !== s && s.detachView(o[x]),
            (r[Re] = null),
            (r[cn] = null),
            (r[Z] &= -129);
        }
        return r;
      }
      function dv(e, t) {
        if (!(256 & t[Z])) {
          const n = t[Y];
          t[Pa]?.destroy(),
            t[Oa]?.destroy(),
            n.destroyNode && Ko(e, t, n, 3, null, null),
            (function KR(e) {
              let t = e[xo];
              if (!t) return Md(e[x], e);
              for (; t; ) {
                let n = null;
                if (Bt(t)) n = t[xo];
                else {
                  const r = t[lt];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[cn] && t !== e; )
                    Bt(t) && Md(t[x], t), (t = t[Re]);
                  null === t && (t = e), Bt(t) && Md(t[x], t), (n = t && t[cn]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Md(e, t) {
        if (!(256 & t[Z])) {
          (t[Z] &= -129),
            (t[Z] |= 256),
            (function XR(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof jo)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          l = o[s + 1];
                        Mn(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          Mn(5, a, l);
                        }
                      }
                    else {
                      Mn(4, i, o);
                      try {
                        o.call(i);
                      } finally {
                        Mn(5, i, o);
                      }
                    }
                  }
                }
            })(e, t),
            (function YR(e, t) {
              const n = e.cleanup,
                r = t[wi];
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (o += 2);
                  } else n[o].call(r[n[o + 1]]);
              null !== r && (t[wi] = null);
              const i = t[Dr];
              if (null !== i) {
                t[Dr] = null;
                for (let o = 0; o < i.length; o++) (0, i[o])();
              }
            })(e, t),
            1 === t[x].type && t[Y].destroy();
          const n = t[Fo];
          if (null !== n && St(t[Re])) {
            n !== t[Re] && cv(n, t);
            const r = t[En];
            null !== r && r.detachView(e);
          }
          !(function FR(e) {
            _d.delete(e[ko]);
          })(t);
        }
      }
      function Td(e, t, n) {
        return (function fv(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Qe];
          {
            const { componentOffset: i } = r;
            if (i > -1) {
              const { encapsulation: o } = e.data[r.directiveStart + i];
              if (o === wt.None || o === wt.Emulated) return null;
            }
            return Mt(r, n);
          }
        })(e, t.parent, n);
      }
      function Gr(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function hv(e, t, n) {
        e.appendChild(t, n);
      }
      function pv(e, t, n, r, i) {
        null !== r ? Gr(e, t, n, r, i) : hv(e, t, n);
      }
      function al(e, t) {
        return e.parentNode(t);
      }
      let Id,
        cl,
        Od,
        dl,
        yv = function mv(e, t, n) {
          return 40 & e.type ? Mt(e, n) : null;
        };
      function ll(e, t, n, r) {
        const i = Td(e, r, t),
          o = t[Y],
          a = (function gv(e, t, n) {
            return yv(e, t, n);
          })(r.parent || t[at], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) pv(o, i, n[l], a, !1);
          else pv(o, i, n, a, !1);
        void 0 !== Id && Id(o, r, t, n, i);
      }
      function Wo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Mt(t, e);
          if (4 & n) return Ad(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Wo(e, r);
            {
              const i = e[t.index];
              return St(i) ? Ad(-1, i) : be(i);
            }
          }
          if (32 & n) return Ed(t, e)() || be(e[t.index]);
          {
            const r = _v(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Wo(qo(e[Ue]), r)
              : Wo(e, t.next);
          }
        }
        return null;
      }
      function _v(e, t) {
        return null !== t ? e[Ue][at].projection[t.projection] : null;
      }
      function Ad(e, t) {
        const n = lt + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[x].firstChild;
          if (null !== i) return Wo(r, i);
        }
        return t[bn];
      }
      function Rd(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && ut(be(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) Rd(e, t, n.child, r, i, o, !1), ji(t, e, i, a, o);
            else if (32 & l) {
              const u = Ed(n, r);
              let c;
              for (; (c = u()); ) ji(t, e, i, c, o);
              ji(t, e, i, a, o);
            } else 16 & l ? Cv(e, t, r, n, i, o) : ji(t, e, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Ko(e, t, n, r, i, o) {
        Rd(n, r, e.firstChild, t, i, o, !1);
      }
      function Cv(e, t, n, r, i, o) {
        const s = n[Ue],
          l = s[at].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) ji(t, e, i, l[u], o);
        else {
          let u = l;
          const c = s[Re];
          rl(r) && (u.flags |= 128), Rd(e, t, u, c, i, o, !0);
        }
      }
      function wv(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Ev(e, t, n) {
        const { mergedAttrs: r, classes: i, styles: o } = n;
        null !== r && Hc(e, t, r),
          null !== i && wv(e, t, i),
          null !== o &&
            (function iP(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, o);
      }
      function Ui(e) {
        return (
          (function Pd() {
            if (void 0 === cl && ((cl = null), we.trustedTypes))
              try {
                cl = we.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return cl;
          })()?.createHTML(e) || e
        );
      }
      function Qo() {
        if (void 0 !== Od) return Od;
        if (typeof document < "u") return document;
        throw new v(210, !1);
      }
      function Nd() {
        if (void 0 === dl && ((dl = null), we.trustedTypes))
          try {
            dl = we.trustedTypes.createPolicy("angular#unsafe-bypass", {
              createHTML: (e) => e,
              createScript: (e) => e,
              createScriptURL: (e) => e,
            });
          } catch {}
        return dl;
      }
      function bv(e) {
        return Nd()?.createHTML(e) || e;
      }
      function Mv(e) {
        return Nd()?.createScriptURL(e) || e;
      }
      class qr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${wm})`;
        }
      }
      class uP extends qr {
        getTypeName() {
          return "HTML";
        }
      }
      class cP extends qr {
        getTypeName() {
          return "Style";
        }
      }
      class dP extends qr {
        getTypeName() {
          return "Script";
        }
      }
      class fP extends qr {
        getTypeName() {
          return "URL";
        }
      }
      class hP extends qr {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function zt(e) {
        return e instanceof qr ? e.changingThisBreaksApplicationSecurity : e;
      }
      function An(e, t) {
        const n = (function pP(e) {
          return (e instanceof qr && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${wm})`);
        }
        return n === t;
      }
      class DP {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const n = new window.DOMParser().parseFromString(
              Ui(t),
              "text/html"
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class CP {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              ));
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement("template");
          return (n.innerHTML = Ui(t)), n;
        }
      }
      const EP = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function fl(e) {
        return (e = String(e)).match(EP) ? e : "unsafe:" + e;
      }
      function Zn(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function Zo(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const Iv = Zn("area,br,col,hr,img,wbr"),
        Av = Zn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Rv = Zn("rp,rt"),
        xd = Zo(
          Iv,
          Zo(
            Av,
            Zn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Zo(
            Rv,
            Zn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Zo(Rv, Av)
        ),
        Fd = Zn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Pv = Zo(
          Fd,
          Zn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Zn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        bP = Zn("script,style,template");
      class SP {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let i = this.checkClobberedElement(n, n.nextSibling);
                if (i) {
                  n = i;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!xd.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !bP.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = t.attributes;
          for (let i = 0; i < r.length; i++) {
            const o = r.item(i),
              s = o.name,
              a = s.toLowerCase();
            if (!Pv.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = o.value;
            Fd[a] && (l = fl(l)), this.buf.push(" ", s, '="', Ov(l), '"');
          }
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          xd.hasOwnProperty(n) &&
            !Iv.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Ov(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const MP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        TP = /([^\#-~ |!])/g;
      function Ov(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(MP, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(TP, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let hl;
      function Nv(e, t) {
        let n = null;
        try {
          hl =
            hl ||
            (function Tv(e) {
              const t = new CP(e);
              return (function wP() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    Ui(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new DP(t)
                : t;
            })(e);
          let r = t ? String(t) : "";
          n = hl.getInertBodyElement(r);
          let i = 5,
            o = r;
          do {
            if (0 === i)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            i--, (r = o), (o = n.innerHTML), (n = hl.getInertBodyElement(r));
          } while (r !== o);
          return Ui(new SP().sanitizeChildren(kd(n) || n));
        } finally {
          if (n) {
            const r = kd(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function kd(e) {
        return "content" in e &&
          (function IP(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var _e = (() => (
        ((_e = _e || {})[(_e.NONE = 0)] = "NONE"),
        (_e[(_e.HTML = 1)] = "HTML"),
        (_e[(_e.STYLE = 2)] = "STYLE"),
        (_e[(_e.SCRIPT = 3)] = "SCRIPT"),
        (_e[(_e.URL = 4)] = "URL"),
        (_e[(_e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        _e
      ))();
      function Ld(e) {
        const t = Yo();
        return t
          ? bv(t.sanitize(_e.HTML, e) || "")
          : An(e, "HTML")
          ? bv(zt(e))
          : Nv(Qo(), Q(e));
      }
      function xv(e) {
        const t = Yo();
        return t
          ? t.sanitize(_e.URL, e) || ""
          : An(e, "URL")
          ? zt(e)
          : fl(Q(e));
      }
      function Fv(e) {
        const t = Yo();
        if (t) return Mv(t.sanitize(_e.RESOURCE_URL, e) || "");
        if (An(e, "ResourceURL")) return Mv(zt(e));
        throw new v(904, !1);
      }
      function Yo() {
        const e = b();
        return e && e[Ur].sanitizer;
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = O({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Wr = new S("ENVIRONMENT_INITIALIZER"),
        Lv = new S("INJECTOR", -1),
        Vv = new S("INJECTOR_DEF_TYPES");
      class jv {
        get(t, n = Ao) {
          if (n === Ao) {
            const r = new Error(`NullInjectorError: No provider for ${Ke(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function pl(e) {
        return { ɵproviders: e };
      }
      function xP(...e) {
        return { ɵproviders: Uv(0, e), ɵfromNgModule: !0 };
      }
      function Uv(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        return (
          Ho(t, (o) => {
            const s = o;
            Vd(s, n, [], r) && ((i ||= []), i.push(s));
          }),
          void 0 !== i && Bv(i, n),
          n
        );
      }
      function Bv(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: i } = e[n];
          jd(i, (o) => {
            t.push(o);
          });
        }
      }
      function Vd(e, t, n, r) {
        if (!(e = W(e))) return !1;
        let i = null,
          o = bm(e);
        const s = !o && ae(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((o = bm(l)), !o)) return !1;
          i = l;
        }
        const a = r.has(i);
        if (s) {
          if (a) return !1;
          if ((r.add(i), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) Vd(u, t, n, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let u;
              r.add(i);
              try {
                Ho(o.imports, (c) => {
                  Vd(c, t, n, r) && ((u ||= []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && Bv(u, t);
            }
            if (!a) {
              const u = Hr(i) || (() => new i());
              t.push(
                { provide: i, useFactory: u, deps: se },
                { provide: Vv, useValue: i, multi: !0 },
                { provide: Wr, useValue: () => w(i), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              jd(l, (c) => {
                t.push(c);
              });
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      function jd(e, t) {
        for (let n of e)
          Fc(n) && (n = n.ɵproviders), Array.isArray(n) ? jd(n, t) : t(n);
      }
      const FP = pe({ provide: String, useValue: pe });
      function Ud(e) {
        return null !== e && "object" == typeof e && FP in e;
      }
      function Kr(e) {
        return "function" == typeof e;
      }
      const Bd = new S("Set Injector scope."),
        gl = {},
        LP = {};
      let Hd;
      function ml() {
        return void 0 === Hd && (Hd = new jv()), Hd;
      }
      class Rn {}
      class $d extends Rn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Gd(t, (s) => this.processProvider(s)),
            this.records.set(Lv, Bi(void 0, this)),
            i.has("environment") && this.records.set(Rn, Bi(void 0, this));
          const o = this.records.get(Bd);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(Vv.multi, se, U.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = _r(this),
            r = Ct(void 0);
          try {
            return t();
          } finally {
            _r(n), Ct(r);
          }
        }
        get(t, n = Ao, r = U.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Pm)))
            return t[Pm](this);
          r = Ia(r);
          const i = _r(this),
            o = Ct(void 0);
          try {
            if (!(r & U.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function HP(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof S)
                    );
                  })(t) && Sa(t);
                (a = l && this.injectableDefInScope(l) ? Bi(zd(t), gl) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & U.Self ? ml() : this.parent).get(
              t,
              (n = r & U.Optional && n === Ao ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Ta] = s[Ta] || []).unshift(Ke(t)), i)) throw s;
              return (function LI(e, t, n, r) {
                const i = e[Ta];
                throw (
                  (t[Im] && i.unshift(t[Im]),
                  (e.message = (function VI(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = Ke(t);
                    if (Array.isArray(t)) i = t.map(Ke).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Ke(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      OI,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Ta] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ct(o), _r(i);
          }
        }
        resolveInjectorInitializers() {
          const t = _r(this),
            n = Ct(void 0);
          try {
            const r = this.get(Wr.multi, se, U.Self);
            for (const i of r) i();
          } finally {
            _r(t), Ct(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Ke(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new v(205, !1);
        }
        processProvider(t) {
          let n = Kr((t = W(t))) ? t : W(t && t.provide);
          const r = (function jP(e) {
            return Ud(e) ? Bi(void 0, e.useValue) : Bi(zv(e), gl);
          })(t);
          if (Kr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = Bi(void 0, gl, !0)),
              (i.factory = () => jc(i.multi)),
              this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === gl && ((n.value = LP), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function BP(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = W(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function zd(e) {
        const t = Sa(e),
          n = null !== t ? t.factory : Hr(e);
        if (null !== n) return n;
        if (e instanceof S) throw new v(204, !1);
        if (e instanceof Function)
          return (function VP(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function $o(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new v(204, !1))
              );
            const n = (function AI(e) {
              return (e && (e[Ma] || e[Sm])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new v(204, !1);
      }
      function zv(e, t, n) {
        let r;
        if (Kr(e)) {
          const i = W(e);
          return Hr(i) || zd(i);
        }
        if (Ud(e)) r = () => W(e.useValue);
        else if (
          (function $v(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...jc(e.deps || []));
        else if (
          (function Hv(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => w(W(e.useExisting));
        else {
          const i = W(e && (e.useClass || e.provide));
          if (
            !(function UP(e) {
              return !!e.deps;
            })(e)
          )
            return Hr(i) || zd(i);
          r = () => new i(...jc(e.deps));
        }
        return r;
      }
      function Bi(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Gd(e, t) {
        for (const n of e)
          Array.isArray(n) ? Gd(n, t) : n && Fc(n) ? Gd(n.ɵproviders, t) : t(n);
      }
      const yl = new S("AppId", { providedIn: "root", factory: () => $P }),
        $P = "ng",
        Gv = new S("Platform Initializer"),
        Qr = new S("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        qv = new S("AnimationModuleType"),
        Wv = new S("CSP nonce", {
          providedIn: "root",
          factory: () =>
            Qo()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Qv = (e, t) => null;
      function Zv(e, t) {
        return Qv(e, t);
      }
      class XP {}
      class Jv {}
      class eO {
        resolveComponentFactory(t) {
          throw (function JP(e) {
            const t = Error(`No component factory found for ${Ke(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let ts = (() => {
        class e {}
        return (e.NULL = new eO()), e;
      })();
      function tO() {
        return Hi(it(), b());
      }
      function Hi(e, t) {
        return new Pt(Mt(e, t));
      }
      let Pt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = tO), e;
      })();
      function nO(e) {
        return e instanceof Pt ? e.nativeElement : e;
      }
      class ns {}
      let Yn = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
          }
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function rO() {
                const e = b(),
                  n = Ht(it().index, e);
                return (Bt(n) ? n : e)[Y];
              })()),
            e
          );
        })(),
        iO = (() => {
          class e {}
          return (
            (e.ɵprov = O({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class rs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const oO = new rs("16.1.1"),
        nf = {};
      function is(e) {
        for (; e; ) {
          e[Z] |= 64;
          const t = qo(e);
          if (Gc(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function rf(e) {
        return e.ngOriginalError;
      }
      class Er {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && rf(t);
          for (; n && rf(n); ) n = rf(n);
          return n || null;
        }
      }
      const r_ = new S("", { providedIn: "root", factory: () => !1 });
      function Xn(e) {
        return e instanceof Function ? e() : e;
      }
      class l_ extends ka {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          is(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, n, r) {
          const i = et(this);
          this.trackingVersion++;
          try {
            t(n, r);
          } finally {
            et(i);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let El = null;
      function u_() {
        return (El ??= new l_()), El;
      }
      function c_(e, t) {
        return e[t] ?? u_();
      }
      function d_(e, t) {
        const n = u_();
        n.hasReadASignal && ((e[t] = El), (n.lView = e), (El = new l_()));
      }
      const X = {};
      function I(e) {
        f_(ie(), b(), gt() + e, !1);
      }
      function f_(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[Z])) {
            const o = e.preOrderCheckHooks;
            null !== o && Ha(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && $a(t, o, 0, n);
          }
        $r(n);
      }
      function y_(e, t = null, n = null, r) {
        const i = v_(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function v_(e, t = null, n = null, r, i = new Set()) {
        const o = [n || se, xP(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : Ke(e))),
          new $d(o, t || ml(), r || null, i)
        );
      }
      let Ot = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return y_({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return y_({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Ao),
          (e.NULL = new jv()),
          (e.ɵprov = O({ token: e, providedIn: "any", factory: () => w(Lv) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function _(e, t = U.Default) {
        const n = b();
        return null === n ? w(e, t) : Ny(it(), n, W(e), t);
      }
      function bl(e, t, n, r, i, o, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[Qe] = i),
          (d[Z] = 140 | r),
          (null !== u || (e && 2048 & e[Z])) && (d[Z] |= 2048),
          ay(d),
          (d[Re] = d[bi] = e),
          (d[je] = n),
          (d[Ur] = s || (e && e[Ur])),
          (d[Y] = a || (e && e[Y])),
          (d[Ei] = l || (e && e[Ei]) || null),
          (d[at] = o),
          (d[ko] = (function NR() {
            return OR++;
          })()),
          (d[Wn] = c),
          (d[zm] = u),
          (d[Ue] = 2 == t.type ? e[Ue] : d),
          d
        );
      }
      function zi(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function sf(e, t, n, r, i) {
            const o = hy(),
              s = Yc(),
              l = (e.data[t] = (function SO(e, t, n, r, i, o) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function Ii() {
                    return null !== q.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: i,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && ((o.next = l), (l.prev = o))),
              l
            );
          })(e, t, n, r, i)),
            (function kA() {
              return q.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function Vo() {
            const e = q.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Tn(o, !0), o;
      }
      function os(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function D_(e, t, n, r, i) {
        const o = c_(t, Pa),
          s = gt(),
          a = 2 & r;
        try {
          if (
            ($r(-1),
            a && t.length > re && f_(e, t, re, !1),
            Mn(a ? 2 : 0, i),
            a)
          )
            o.runInContext(n, r, i);
          else {
            const u = et(null);
            try {
              n(r, i);
            } finally {
              et(u);
            }
          }
        } finally {
          a && null === t[Pa] && d_(t, Pa), $r(s), Mn(a ? 3 : 1, i);
        }
      }
      function af(e, t, n) {
        if (zc(t)) {
          const r = et(null);
          try {
            const o = t.directiveEnd;
            for (let s = t.directiveStart; s < o; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            et(r);
          }
        }
      }
      function lf(e, t, n) {
        fy() &&
          ((function OO(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            Br(n) &&
              (function jO(e, t, n) {
                const r = Mt(t, e),
                  i = C_(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = Sl(
                  e,
                  bl(
                    e,
                    i,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[Ur].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[i + n.componentOffset]),
              e.firstCreatePass || Wa(n, t),
              ut(r, t);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const l = e.data[a],
                u = zr(t, e, a, n);
              ut(u, t),
                null !== s && UO(0, a - i, u, l, 0, s),
                dn(l) && (Ht(n.index, t)[je] = zr(t, e, a, n));
            }
          })(e, t, n, Mt(n, t)),
          64 == (64 & n.flags) && M_(e, t, n));
      }
      function uf(e, t, n = Mt) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function C_(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = cf(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function cf(e, t, n, r, i, o, s, a, l, u, c) {
        const d = re + r,
          f = d + i,
          h = (function _O(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : X);
            return n;
          })(d, f),
          p = "function" == typeof u ? u() : u;
        return (h[x] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let w_ = (e) => null;
      function E_(e, t, n, r) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            n = null === n ? {} : n;
            const o = e[i];
            null === r
              ? b_(n, t, i, o)
              : r.hasOwnProperty(i) && b_(n, t, r[i], o);
          }
        return n;
      }
      function b_(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Gt(e, t, n, r, i, o, s, a) {
        const l = Mt(t, n);
        let c,
          u = t.inputs;
        !a && null != u && (c = u[r])
          ? (gf(e, n, c, r, i),
            Br(t) &&
              (function IO(e, t) {
                const n = Ht(t, e);
                16 & n[Z] || (n[Z] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function TO(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (i = null != s ? s(i, t.value || "", r) : i),
            o.setProperty(l, r, i));
      }
      function df(e, t, n, r) {
        if (fy()) {
          const i = null === r ? null : { "": -1 },
            o = (function xO(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                i = null;
              if (n)
                for (let o = 0; o < n.length; o++) {
                  const s = n[o];
                  if (Vm(t, s.selectors, !1))
                    if ((r || (r = []), dn(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (i = i || new Map()),
                          s.findHostDirectiveDefs(s, a, i),
                          r.unshift(...a, s),
                          ff(e, t, a.length);
                      } else r.unshift(s), ff(e, t, 0);
                    else
                      (i = i || new Map()),
                        s.findHostDirectiveDefs?.(s, r, i),
                        r.push(s);
                }
              return null === r ? null : [r, i];
            })(e, n);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && S_(e, t, n, s, i, a),
            i &&
              (function FO(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let i = 0; i < t.length; i += 2) {
                    const o = n[t[i + 1]];
                    if (null == o) throw new v(-301, !1);
                    r.push(t[i], o);
                  }
                }
              })(n, r, i);
        }
        n.mergedAttrs = Oo(n.mergedAttrs, n.attrs);
      }
      function S_(e, t, n, r, i, o) {
        for (let u = 0; u < r.length; u++) ud(Wa(n, t), e, r[u].type);
        !(function LO(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = os(e, t, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (n.mergedAttrs = Oo(n.mergedAttrs, c.hostAttrs)),
            VO(e, n, t, l, c),
            kO(l, c, i),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            l++;
        }
        !(function MO(e, t, n) {
          const i = t.directiveEnd,
            o = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = t.directiveStart; c < i; c++) {
            const d = o[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (l = E_(d.inputs, c, l, f ? f.inputs : null)),
              (u = E_(d.outputs, c, u, p));
            const g = null === l || null === s || Lm(t) ? null : BO(l, c, s);
            a.push(g);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = u);
        })(e, n, o);
      }
      function M_(e, t, n) {
        const r = n.directiveStart,
          i = n.directiveEnd,
          o = n.index,
          s = (function VA() {
            return q.lFrame.currentDirectiveIndex;
          })();
        try {
          $r(o);
          for (let a = r; a < i; a++) {
            const l = e.data[a],
              u = t[a];
            Jc(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                NO(l, u);
          }
        } finally {
          $r(-1), Jc(s);
        }
      }
      function NO(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function ff(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function kO(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          dn(t) && (n[""] = e);
        }
      }
      function VO(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = Hr(i.type)),
          s = new jo(o, dn(i), _);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function RO(e, t, n, r, i) {
            const o = i.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function PO(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, o);
            }
          })(e, t, r, os(e, n, i.hostVars, X), i);
      }
      function Pn(e, t, n, r, i, o) {
        const s = Mt(e, t);
        !(function hf(e, t, n, r, i, o, s) {
          if (null == o) e.removeAttribute(t, i, n);
          else {
            const a = null == s ? Q(o) : s(o, r || "", i);
            e.setAttribute(t, i, a, n);
          }
        })(t[Y], s, o, e.value, n, r, i);
      }
      function UO(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) T_(r, n, s[a++], s[a++], s[a++]);
      }
      function T_(e, t, n, r, i) {
        const o = et(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (i = s[r].call(t, i)),
            null !== e.setInput ? e.setInput(t, i, n, r) : (t[r] = i);
        } finally {
          et(o);
        }
      }
      function BO(e, t, n) {
        let r = null,
          i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === r && (r = []);
                const s = e[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(o, s[a + 1], n[i + 1]);
                    break;
                  }
              }
              i += 2;
            } else i += 2;
          else i += 4;
        }
        return r;
      }
      function I_(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function A_(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              td(n[r]), s.contentQueries(2, t[o], o);
            }
          }
      }
      function Sl(e, t) {
        return e[xo] ? (e[$m][cn] = t) : (e[xo] = t), (e[$m] = t), t;
      }
      function pf(e, t, n) {
        td(0);
        const r = et(null);
        try {
          t(e, n);
        } finally {
          et(r);
        }
      }
      function R_(e) {
        return e[wi] || (e[wi] = []);
      }
      function P_(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function N_(e, t) {
        const n = e[Ei],
          r = n ? n.get(Er, null) : null;
        r && r.handleError(t);
      }
      function gf(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++];
          T_(e.data[s], t[s], r, a, i);
        }
      }
      function HO(e, t) {
        const n = Ht(t, e),
          r = n[x];
        !(function $O(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const i = n[Qe];
        null !== i && null === n[Wn] && (n[Wn] = Zv(i, n[Ei])), mf(r, n, n[je]);
      }
      function mf(e, t, n) {
        nd(t);
        try {
          const r = e.viewQuery;
          null !== r && pf(1, r, n);
          const i = e.template;
          null !== i && D_(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && A_(e, t),
            e.staticViewQueries && pf(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function zO(e, t) {
              for (let n = 0; n < t.length; n++) HO(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[Z] &= -5), rd();
        }
      }
      let Ml = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = qO), (e.__NG_ENV_ID__ = (t) => t), e;
      })();
      class GO extends Ml {
        constructor(t) {
          super(), (this._lView = t);
        }
        onDestroy(t) {
          return (
            cy(this._lView, t),
            () =>
              (function MA(e, t) {
                if (null === e[Dr]) return;
                const n = e[Dr].indexOf(t);
                -1 !== n && e[Dr].splice(n, 1);
              })(this._lView, t)
          );
        }
      }
      function qO() {
        return new GO(b());
      }
      let x_ = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, i) {
            const o = typeof Zone > "u" ? null : Zone.current,
              s = new pA(
                n,
                (u) => {
                  this.all.has(u) && this.queue.set(u, o);
                },
                i
              );
            let a;
            this.all.add(s), s.notify();
            const l = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(l)), { destroy: l };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          (e.ɵprov = O({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          e
        );
      })();
      function Tl(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Nc(i, a))
              : 2 == o && (r = Nc(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function ss(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          if ((null !== o && r.push(be(o)), St(o))) {
            for (let a = lt; a < o.length; a++) {
              const l = o[a],
                u = l[x].firstChild;
              null !== u && ss(l[x], l, u, r);
            }
            o[bn] !== o[Qe] && r.push(o[bn]);
          }
          const s = n.type;
          if (8 & s) ss(e, t, n.child, r);
          else if (32 & s) {
            const a = Ed(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = _v(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = qo(t[Ue]);
              ss(l[x], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      function Il(e, t, n, r = !0) {
        const i = t[Ur].rendererFactory;
        i.begin && i.begin();
        try {
          F_(e, t, e.template, n);
        } catch (s) {
          throw (r && N_(t, s), s);
        } finally {
          i.end && i.end(), t[Ur].effectManager?.flush();
        }
      }
      function F_(e, t, n, r) {
        const i = t[Z];
        if (256 != (256 & i)) {
          t[Ur].effectManager?.flush(), nd(t);
          try {
            ay(t),
              (function gy(e) {
                return (q.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && D_(e, t, n, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && Ha(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && $a(t, u, 0, null), id(t, 0);
            }
            if (
              ((function QO(e) {
                for (let t = sv(e); null !== t; t = av(t)) {
                  if (!t[Gm]) continue;
                  const n = t[Mi];
                  for (let r = 0; r < n.length; r++) {
                    SA(n[r]);
                  }
                }
              })(t),
              k_(t, 2),
              null !== e.contentQueries && A_(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && Ha(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && $a(t, u, 1), id(t, 1);
            }
            !(function vO(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = c_(t, Oa);
              try {
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (o < 0) $r(~o);
                  else {
                    const s = o,
                      a = n[++i],
                      l = n[++i];
                    LA(a, s), r.runInContext(l, 2, t[s]);
                  }
                }
              } finally {
                null === t[Oa] && d_(t, Oa), $r(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && V_(t, a, 0);
            const l = e.viewQuery;
            if ((null !== l && pf(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && Ha(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && $a(t, u, 2), id(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[Z] &= -73),
              ly(t);
          } finally {
            rd();
          }
        }
      }
      function k_(e, t) {
        for (let n = sv(e); null !== n; n = av(n))
          for (let r = lt; r < n.length; r++) L_(n[r], t);
      }
      function ZO(e, t, n) {
        L_(Ht(t, e), n);
      }
      function L_(e, t) {
        if (
          !(function EA(e) {
            return 128 == (128 & e[Z]);
          })(e)
        )
          return;
        const n = e[x];
        if ((80 & e[Z] && 0 === t) || 1024 & e[Z] || 2 === t)
          F_(n, e, n.template, e[je]);
        else if (e[No] > 0) {
          k_(e, 1);
          const i = e[x].components;
          null !== i && V_(e, i, 1);
        }
      }
      function V_(e, t, n) {
        for (let r = 0; r < t.length; r++) ZO(e, t[r], n);
      }
      class as {
        get rootNodes() {
          const t = this._lView,
            n = t[x];
          return ss(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[je];
        }
        set context(t) {
          this._lView[je] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[Z]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[Re];
            if (St(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Sd(t, r), Za(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          dv(this._lView[x], this._lView);
        }
        onDestroy(t) {
          cy(this._lView, t);
        }
        markForCheck() {
          is(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[Z] &= -129;
        }
        reattach() {
          this._lView[Z] |= 128;
        }
        detectChanges() {
          Il(this._lView[x], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new v(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function WR(e, t) {
              Ko(e, t, t[Y], 2, null, null);
            })(this._lView[x], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new v(902, !1);
          this._appRef = t;
        }
      }
      class YO extends as {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Il(t[x], t, t[je], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class j_ extends ts {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = ae(t);
          return new ls(n, this.ngModule);
        }
      }
      function U_(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class JO {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Ia(r);
          const i = this.injector.get(t, nf, r);
          return i !== nf || n === nf ? i : this.parentInjector.get(t, n, r);
        }
      }
      class ls extends Jv {
        get inputs() {
          return U_(this.componentDef.inputs);
        }
        get outputs() {
          return U_(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function KI(e) {
              return e.map(WI).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, i) {
          let o = (i = i || this.ngModule) instanceof Rn ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new JO(t, o) : t,
            a = s.get(ns, null);
          if (null === a) throw new v(407, !1);
          const c = {
              rendererFactory: a,
              sanitizer: s.get(iO, null),
              effectManager: s.get(x_, null),
            },
            d = a.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || "div",
            h = r
              ? (function DO(e, t, n, r) {
                  const o = r.get(r_, !1) || n === wt.ShadowDom,
                    s = e.selectRootElement(t, o);
                  return (
                    (function CO(e) {
                      w_(e);
                    })(s),
                    s
                  );
                })(d, r, this.componentDef.encapsulation, s)
              : sl(
                  d,
                  f,
                  (function XO(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(f)
                ),
            m = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528,
            C = cf(0, null, null, 1, 0, null, null, null, null, null, null),
            y = bl(null, C, null, m, null, null, c, d, s, null, null);
          let A, F;
          nd(y);
          try {
            const V = this.componentDef;
            let fe,
              Ge = null;
            V.findHostDirectiveDefs
              ? ((fe = []),
                (Ge = new Map()),
                V.findHostDirectiveDefs(V, fe, Ge),
                fe.push(V))
              : (fe = [V]);
            const _n = (function t1(e, t) {
                const n = e[x],
                  r = re;
                return (e[r] = t), zi(n, r, 2, "#host", null);
              })(y, h),
              Dn = (function n1(e, t, n, r, i, o, s) {
                const a = i[x];
                !(function r1(e, t, n, r) {
                  for (const i of e)
                    t.mergedAttrs = Oo(t.mergedAttrs, i.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Tl(t, t.mergedAttrs, !0), null !== n && Ev(r, n, t));
                })(r, e, t, s);
                let l = null;
                null !== t && (l = Zv(t, i[Ei]));
                const u = o.rendererFactory.createRenderer(t, n);
                let c = 16;
                n.signals ? (c = 4096) : n.onPush && (c = 64);
                const d = bl(
                  i,
                  C_(n),
                  null,
                  c,
                  i[e.index],
                  e,
                  o,
                  u,
                  null,
                  null,
                  l
                );
                return (
                  a.firstCreatePass && ff(a, e, r.length - 1),
                  Sl(i, d),
                  (i[e.index] = d)
                );
              })(_n, h, V, fe, y, c, d);
            (F = sy(C, re)),
              h &&
                (function o1(e, t, n, r) {
                  if (r) Hc(e, n, ["ng-version", oO.full]);
                  else {
                    const { attrs: i, classes: o } = (function QI(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        i = 2;
                      for (; r < e.length; ) {
                        let o = e[r];
                        if ("string" == typeof o)
                          2 === i
                            ? "" !== o && t.push(o, e[++r])
                            : 8 === i && n.push(o);
                        else {
                          if (!ln(i)) break;
                          i = o;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    i && Hc(e, n, i),
                      o && o.length > 0 && wv(e, n, o.join(" "));
                  }
                })(d, V, h, r),
              void 0 !== n &&
                (function s1(e, t, n) {
                  const r = (e.projection = []);
                  for (let i = 0; i < t.length; i++) {
                    const o = n[i];
                    r.push(null != o ? Array.from(o) : null);
                  }
                })(F, this.ngContentSelectors, n),
              (A = (function i1(e, t, n, r, i, o) {
                const s = it(),
                  a = i[x],
                  l = Mt(s, i);
                S_(a, i, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  ut(zr(i, a, s.directiveStart + c, s), i);
                M_(a, i, s), l && ut(l, i);
                const u = zr(i, a, s.directiveStart + s.componentOffset, s);
                if (((e[je] = i[je] = u), null !== o))
                  for (const c of o) c(u, t);
                return af(a, s, e), u;
              })(Dn, V, fe, Ge, y, [a1])),
              mf(C, y, null);
          } finally {
            rd();
          }
          return new e1(this.componentType, A, Hi(F, y), y, F);
        }
      }
      class e1 extends XP {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new YO(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const o = this._rootLView;
            gf(o[x], o, i, t, n),
              this.previousInputValues.set(t, n),
              is(Ht(this._tNode.index, o));
          }
        }
        get injector() {
          return new Pi(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function a1() {
        const e = it();
        Ba(b()[x], e);
      }
      function ge(e) {
        let t = (function B_(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let i;
          if (dn(e)) i = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new v(903, !1);
            i = t.ɵdir;
          }
          if (i) {
            if (n) {
              r.push(i);
              const s = e;
              (s.inputs = Al(e.inputs)),
                (s.inputTransforms = Al(e.inputTransforms)),
                (s.declaredInputs = Al(e.declaredInputs)),
                (s.outputs = Al(e.outputs));
              const a = i.hostBindings;
              a && d1(e, a);
              const l = i.viewQuery,
                u = i.contentQueries;
              if (
                (l && u1(e, l),
                u && c1(e, u),
                wa(e.inputs, i.inputs),
                wa(e.declaredInputs, i.declaredInputs),
                wa(e.outputs, i.outputs),
                null !== i.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  wa(s.inputTransforms, i.inputTransforms)),
                dn(i) && i.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(i.data.animation);
              }
            }
            const o = i.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(e), a === ge && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function l1(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const i = e[r];
            (i.hostVars = t += i.hostVars),
              (i.hostAttrs = Oo(i.hostAttrs, (n = Oo(n, i.hostAttrs))));
          }
        })(r);
      }
      function Al(e) {
        return e === wn ? {} : e === se ? [] : e;
      }
      function u1(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, i) => {
              t(r, i), n(r, i);
            }
          : t;
      }
      function c1(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, i, o) => {
              t(r, i, o), n(r, i, o);
            }
          : t;
      }
      function d1(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, i) => {
              t(r, i), n(r, i);
            }
          : t;
      }
      function G_(e) {
        const t = e.inputConfig,
          n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            const i = t[r];
            Array.isArray(i) && i[2] && (n[r] = i[2]);
          }
        e.inputTransforms = n;
      }
      function Rl(e) {
        return (
          !!yf(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function yf(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function ct(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Nt(e, t, n, r) {
        const i = b();
        return ct(i, Ai(), t) && (ie(), Pn(Pe(), i, e, t, n, r)), Nt;
      }
      function L(e, t, n, r, i, o, s, a) {
        const l = b(),
          u = ie(),
          c = e + re,
          d = u.firstCreatePass
            ? (function k1(e, t, n, r, i, o, s, a, l) {
                const u = t.consts,
                  c = zi(t, e, 4, s || null, Cr(u, a));
                df(t, n, c, Cr(u, l)), Ba(t, c);
                const d = (c.tView = cf(
                  2,
                  c,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, i, o, s)
            : u.data[c];
        Tn(d, !1);
        const f = iD(u, l, d, e);
        Ua() && ll(u, l, f, d),
          ut(f, l),
          Sl(l, (l[c] = I_(f, l, f, d))),
          xa(d) && lf(u, l, d),
          null != s && uf(l, d, a);
      }
      let iD = function oD(e, t, n, r) {
        return wr(!0), t[Y].createComment("");
      };
      function P(e, t, n) {
        const r = b();
        return ct(r, Ai(), t) && Gt(ie(), Pe(), r, e, t, r[Y], n, !1), P;
      }
      function Ef(e, t, n, r, i) {
        const s = i ? "class" : "style";
        gf(e, n, t.inputs[s], s, r);
      }
      function E(e, t, n, r) {
        const i = b(),
          o = ie(),
          s = re + e,
          a = i[Y],
          l = o.firstCreatePass
            ? (function B1(e, t, n, r, i, o) {
                const s = t.consts,
                  l = zi(t, e, 2, r, Cr(s, i));
                return (
                  df(t, n, l, Cr(s, o)),
                  null !== l.attrs && Tl(l, l.attrs, !1),
                  null !== l.mergedAttrs && Tl(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, o, i, t, n, r)
            : o.data[s],
          u = sD(o, i, l, a, t, e);
        i[s] = u;
        const c = xa(l);
        return (
          Tn(l, !0),
          Ev(a, u, l),
          32 != (32 & l.flags) && Ua() && ll(o, i, u, l),
          0 ===
            (function TA() {
              return q.lFrame.elementDepthCount;
            })() && ut(u, i),
          (function IA() {
            q.lFrame.elementDepthCount++;
          })(),
          c && (lf(o, i, l), af(o, l, i)),
          null !== r && uf(i, l),
          E
        );
      }
      function D() {
        let e = it();
        Yc() ? Xc() : ((e = e.parent), Tn(e, !1));
        const t = e;
        (function RA(e) {
          return q.skipHydrationRootTNode === e;
        })(t) &&
          (function xA() {
            q.skipHydrationRootTNode = null;
          })(),
          (function AA() {
            q.lFrame.elementDepthCount--;
          })();
        const n = ie();
        return (
          n.firstCreatePass && (Ba(n, e), zc(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function QA(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Ef(n, t, b(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function ZA(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Ef(n, t, b(), t.stylesWithoutHost, !1),
          D
        );
      }
      function de(e, t, n, r) {
        return E(e, t, n, r), D(), de;
      }
      let sD = (e, t, n, r, i, o) => (
        wr(!0),
        sl(
          r,
          i,
          (function Ey() {
            return q.lFrame.currentNamespace;
          })()
        )
      );
      function hs(e, t, n) {
        const r = b(),
          i = ie(),
          o = e + re,
          s = i.firstCreatePass
            ? (function z1(e, t, n, r, i) {
                const o = t.consts,
                  s = Cr(o, r),
                  a = zi(t, e, 8, "ng-container", s);
                return (
                  null !== s && Tl(a, s, !0),
                  df(t, n, a, Cr(o, i)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(o, i, r, t, n)
            : i.data[o];
        Tn(s, !0);
        const a = lD(i, r, s, e);
        return (
          (r[o] = a),
          Ua() && ll(i, r, a, s),
          ut(a, r),
          xa(s) && (lf(i, r, s), af(i, s, r)),
          null != n && uf(r, s),
          hs
        );
      }
      function ps() {
        let e = it();
        const t = ie();
        return (
          Yc() ? Xc() : ((e = e.parent), Tn(e, !1)),
          t.firstCreatePass && (Ba(t, e), zc(e) && t.queries.elementEnd(e)),
          ps
        );
      }
      let lD = (e, t, n, r) => (wr(!0), bd(t[Y], ""));
      function xt() {
        return b();
      }
      function gs(e) {
        return !!e && "function" == typeof e.then;
      }
      function uD(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function le(e, t, n, r) {
        const i = b(),
          o = ie(),
          s = it();
        return (
          (function dD(e, t, n, r, i, o, s) {
            const a = xa(r),
              u = e.firstCreatePass && P_(e),
              c = t[je],
              d = R_(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Mt(r, t),
                m = s ? s(g) : g,
                C = d.length,
                y = s ? (F) => s(be(F[r.index])) : r.index;
              let A = null;
              if (
                (!s &&
                  a &&
                  (A = (function W1(e, t, n, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === n && i[o + 1] === r) {
                          const a = t[wi],
                            l = i[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, t, i, r.index)),
                null !== A)
              )
                ((A.__ngLastListenerFn__ || A).__ngNextListenerFn__ = o),
                  (A.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = hD(r, t, c, o, !1);
                const F = n.listen(m, i, o);
                d.push(o, F), u && u.push(i, y, C, C + 1);
              }
            } else o = hD(r, t, c, o, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[i])) {
              const g = p.length;
              if (g)
                for (let m = 0; m < g; m += 2) {
                  const V = t[p[m]][p[m + 1]].subscribe(o),
                    fe = d.length;
                  d.push(o, V), u && u.push(i, r.index, fe, -(fe + 1));
                }
            }
          })(o, i, i[Y], s, e, t, r),
          le
        );
      }
      function fD(e, t, n, r) {
        try {
          return Mn(6, t, n), !1 !== n(r);
        } catch (i) {
          return N_(e, i), !1;
        } finally {
          Mn(7, t, n);
        }
      }
      function hD(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          is(e.componentOffset > -1 ? Ht(e.index, t) : t);
          let l = fD(t, n, r, s),
            u = o.__ngNextListenerFn__;
          for (; u; ) (l = fD(t, n, u, s) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && s.preventDefault(), l;
        };
      }
      function K(e = 1) {
        return (function UA(e) {
          return (q.lFrame.contextLView = (function BA(e, t) {
            for (; e > 0; ) (t = t[bi]), e--;
            return t;
          })(e, q.lFrame.contextLView))[je];
        })(e);
      }
      function Fl(e, t) {
        return (e << 17) | (t << 2);
      }
      function br(e) {
        return (e >> 17) & 32767;
      }
      function Sf(e) {
        return 2 | e;
      }
      function Yr(e) {
        return (131068 & e) >> 2;
      }
      function Mf(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Tf(e) {
        return 1 | e;
      }
      function ED(e, t, n, r, i) {
        const o = e[n + 1],
          s = null === t;
        let a = r ? br(o) : Yr(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          nN(e[a], t) && ((l = !0), (e[a + 1] = r ? Tf(c) : Sf(c))),
            (a = r ? br(c) : Yr(c));
        }
        l && (e[n + 1] = r ? Sf(o) : Tf(o));
      }
      function nN(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && ki(e, t) >= 0)
        );
      }
      const Ye = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function bD(e) {
        return e.substring(Ye.key, Ye.keyEnd);
      }
      function SD(e, t) {
        const n = Ye.textEnd;
        return n === t
          ? -1
          : ((t = Ye.keyEnd =
              (function sN(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (Ye.key = t), n)),
            eo(e, t, n));
      }
      function eo(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function to(e, t, n) {
        return fn(e, t, n, !1), to;
      }
      function kl(e, t) {
        return fn(e, t, null, !0), kl;
      }
      function er(e) {
        !(function hn(e, t, n, r) {
          const i = ie(),
            o = Qn(2);
          i.firstUpdatePass && PD(i, null, o, r);
          const s = b();
          if (n !== X && ct(s, o, n)) {
            const a = i.data[gt()];
            if (FD(a, r) && !RD(i, o)) {
              let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (n = Nc(l, n || "")), Ef(i, a, s, n, r);
            } else
              !(function mN(e, t, n, r, i, o, s, a) {
                i === X && (i = se);
                let l = 0,
                  u = 0,
                  c = 0 < i.length ? i[0] : null,
                  d = 0 < o.length ? o[0] : null;
                for (; null !== c || null !== d; ) {
                  const f = l < i.length ? i[l + 1] : void 0,
                    h = u < o.length ? o[u + 1] : void 0;
                  let g,
                    p = null;
                  c === d
                    ? ((l += 2), (u += 2), f !== h && ((p = d), (g = h)))
                    : null === d || (null !== c && c < d)
                    ? ((l += 2), (p = c))
                    : ((u += 2), (p = d), (g = h)),
                    null !== p && ND(e, t, n, r, p, g, s, a),
                    (c = l < i.length ? i[l] : null),
                    (d = u < o.length ? o[u] : null);
                }
              })(
                i,
                a,
                s,
                s[Y],
                s[o + 1],
                (s[o + 1] = (function pN(e, t, n) {
                  if (null == n || "" === n) return se;
                  const r = [],
                    i = zt(n);
                  if (Array.isArray(i))
                    for (let o = 0; o < i.length; o++) e(r, i[o], !0);
                  else if ("object" == typeof i)
                    for (const o in i) i.hasOwnProperty(o) && e(r, o, i[o]);
                  else "string" == typeof i && t(r, i);
                  return r;
                })(e, t, n)),
                r,
                o
              );
          }
        })(gN, xn, e, !0);
      }
      function xn(e, t) {
        for (
          let n = (function iN(e) {
            return (
              (function TD(e) {
                (Ye.key = 0),
                  (Ye.keyEnd = 0),
                  (Ye.value = 0),
                  (Ye.valueEnd = 0),
                  (Ye.textEnd = e.length);
              })(e),
              SD(e, eo(e, 0, Ye.textEnd))
            );
          })(t);
          n >= 0;
          n = SD(t, n)
        )
          $t(e, bD(t), !0);
      }
      function fn(e, t, n, r) {
        const i = b(),
          o = ie(),
          s = Qn(2);
        o.firstUpdatePass && PD(o, e, s, r),
          t !== X &&
            ct(i, s, t) &&
            ND(
              o,
              o.data[gt()],
              i,
              i[Y],
              e,
              (i[s + 1] = (function yN(e, t) {
                return (
                  null == e ||
                    "" === e ||
                    ("string" == typeof t
                      ? (e += t)
                      : "object" == typeof e && (e = Ke(zt(e)))),
                  e
                );
              })(t, n)),
              r,
              s
            );
      }
      function RD(e, t) {
        return t >= e.expandoStartIndex;
      }
      function PD(e, t, n, r) {
        const i = e.data;
        if (null === i[n + 1]) {
          const o = i[gt()],
            s = RD(e, n);
          FD(o, r) && null === t && !s && (t = !1),
            (t = (function cN(e, t, n, r) {
              const i = ed(e);
              let o = r ? t.residualClasses : t.residualStyles;
              if (null === i)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = ms((n = If(null, e, t, n, r)), t.attrs, r)),
                  (o = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== i)
                  if (((n = If(i, e, t, n, r)), null === o)) {
                    let l = (function dN(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== Yr(r)) return e[br(r)];
                    })(e, t, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = If(null, e, t, l[1], r)),
                      (l = ms(l, t.attrs, r)),
                      (function fN(e, t, n, r) {
                        e[br(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, l));
                  } else
                    o = (function hN(e, t, n) {
                      let r;
                      const i = t.directiveEnd;
                      for (let o = 1 + t.directiveStylingLast; o < i; o++)
                        r = ms(r, e[o].hostAttrs, n);
                      return ms(r, t.attrs, n);
                    })(e, t, r);
              }
              return (
                void 0 !== o &&
                  (r ? (t.residualClasses = o) : (t.residualStyles = o)),
                n
              );
            })(i, o, t, r)),
            (function eN(e, t, n, r, i, o) {
              let s = o ? t.classBindings : t.styleBindings,
                a = br(s),
                l = Yr(s);
              e[r] = n;
              let c,
                u = !1;
              if (
                (Array.isArray(n)
                  ? ((c = n[1]), (null === c || ki(n, c) > 0) && (u = !0))
                  : (c = n),
                i)
              )
                if (0 !== l) {
                  const f = br(e[a + 1]);
                  (e[r + 1] = Fl(f, a)),
                    0 !== f && (e[f + 1] = Mf(e[f + 1], r)),
                    (e[a + 1] = (function X1(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = Fl(a, 0)),
                    0 !== a && (e[a + 1] = Mf(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = Fl(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = Mf(e[l + 1], r)),
                  (l = r);
              u && (e[r + 1] = Sf(e[r + 1])),
                ED(e, c, r, !0),
                ED(e, c, r, !1),
                (function tN(e, t, n, r, i) {
                  const o = i ? e.residualClasses : e.residualStyles;
                  null != o &&
                    "string" == typeof t &&
                    ki(o, t) >= 0 &&
                    (n[r + 1] = Tf(n[r + 1]));
                })(t, c, e, r, o),
                (s = Fl(a, l)),
                o ? (t.classBindings = s) : (t.styleBindings = s);
            })(i, o, t, n, s, r);
        }
      }
      function If(e, t, n, r, i) {
        let o = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((o = t[a]), (r = ms(r, o.hostAttrs, i)), o !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function ms(e, t, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (i = s)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                $t(e, s, !!n || t[++o]));
          }
        return void 0 === e ? null : e;
      }
      function gN(e, t, n) {
        const r = String(t);
        "" !== r && !r.includes(" ") && $t(e, r, n);
      }
      function ND(e, t, n, r, i, o, s, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          u = l[a + 1],
          c = (function J1(e) {
            return 1 == (1 & e);
          })(u)
            ? xD(l, t, n, i, Yr(u), s)
            : void 0;
        Ll(c) ||
          (Ll(o) ||
            ((function Y1(e) {
              return 2 == (2 & e);
            })(u) &&
              (o = xD(l, null, n, i, a, s))),
          (function rP(e, t, n, r, i) {
            if (t) i ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let o = -1 === r.indexOf("-") ? void 0 : At.DashCase;
              null == i
                ? e.removeStyle(n, r, o)
                : ("string" == typeof i &&
                    i.endsWith("!important") &&
                    ((i = i.slice(0, -10)), (o |= At.Important)),
                  e.setStyle(n, r, i, o));
            }
          })(r, s, ja(gt(), n), i, o));
      }
      function xD(e, t, n, r, i, o) {
        const s = null === t;
        let a;
        for (; i > 0; ) {
          const l = e[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[i + 1];
          f === X && (f = d ? se : void 0);
          let h = d ? fd(f, r) : c === r ? f : void 0;
          if ((u && !Ll(h) && (h = fd(l, r)), Ll(h) && ((a = h), s))) return a;
          const p = e[i + 1];
          i = s ? br(p) : Yr(p);
        }
        if (null !== t) {
          let l = o ? t.residualClasses : t.residualStyles;
          null != l && (a = fd(l, r));
        }
        return a;
      }
      function Ll(e) {
        return void 0 !== e;
      }
      function FD(e, t) {
        return 0 != (e.flags & (t ? 8 : 16));
      }
      function R(e, t = "") {
        const n = b(),
          r = ie(),
          i = e + re,
          o = r.firstCreatePass ? zi(r, i, 1, t, null) : r.data[i],
          s = kD(r, n, o, t, e);
        (n[i] = s), Ua() && ll(r, n, s, o), Tn(o, !1);
      }
      let kD = (e, t, n, r, i) => (
        wr(!0),
        (function ol(e, t) {
          return e.createText(t);
        })(t[Y], r)
      );
      function tr(e) {
        return qt("", e, ""), tr;
      }
      function qt(e, t, n) {
        const r = b(),
          i = (function qi(e, t, n, r) {
            return ct(e, Ai(), n) ? t + Q(n) + r : X;
          })(r, e, t, n);
        return (
          i !== X &&
            (function Jn(e, t, n) {
              const r = ja(t, e);
              !(function uv(e, t, n) {
                e.setValue(t, n);
              })(e[Y], r, n);
            })(r, gt(), i),
          qt
        );
      }
      function Af(e, t, n) {
        const r = b();
        if (ct(r, Ai(), t)) {
          const o = ie(),
            s = Pe();
          Gt(
            o,
            s,
            r,
            e,
            t,
            (function O_(e, t, n) {
              return (
                (null === e || dn(e)) &&
                  (n = (function DA(e) {
                    for (; Array.isArray(e); ) {
                      if ("object" == typeof e[$c]) return e;
                      e = e[Qe];
                    }
                    return null;
                  })(n[t.index])),
                n[Y]
              );
            })(ed(o.data), s, r),
            n,
            !0
          );
        }
        return Af;
      }
      const ro = "en-US";
      let rC = ro;
      function Of(e, t, n, r, i) {
        if (((e = W(e)), Array.isArray(e)))
          for (let o = 0; o < e.length; o++) Of(e[o], t, n, r, i);
        else {
          const o = ie(),
            s = b();
          let a = Kr(e) ? e : W(e.provide),
            l = zv(e);
          const u = it(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (Kr(e) || !e.multi) {
            const h = new jo(l, i, _),
              p = xf(a, t, i ? c : c + f, d);
            -1 === p
              ? (ud(Wa(u, s), o, a),
                Nf(o, e, t.length),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = xf(a, t, c + f, d),
              p = xf(a, t, c, c + f),
              m = p >= 0 && n[p];
            if ((i && !m) || (!i && !(h >= 0 && n[h]))) {
              ud(Wa(u, s), o, a);
              const C = (function Lx(e, t, n, r, i) {
                const o = new jo(e, n, _);
                return (
                  (o.multi = []),
                  (o.index = t),
                  (o.componentProviders = 0),
                  IC(o, i, r && !n),
                  o
                );
              })(i ? kx : Fx, n.length, i, r, l);
              !i && m && (n[p].providerFactory = C),
                Nf(o, e, t.length, 0),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                n.push(C),
                s.push(C);
            } else Nf(o, e, h > -1 ? h : p, IC(n[i ? p : h], l, !i && r));
            !i && r && m && n[p].componentProviders++;
          }
        }
      }
      function Nf(e, t, n, r) {
        const i = Kr(t),
          o = (function kP(e) {
            return !!e.useClass;
          })(t);
        if (i || o) {
          const l = (o ? W(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!i && t.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function IC(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function xf(e, t, n, r) {
        for (let i = n; i < r; i++) if (t[i] === e) return i;
        return -1;
      }
      function Fx(e, t, n, r) {
        return Ff(this.multi, []);
      }
      function kx(e, t, n, r) {
        const i = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = zr(n, n[x], this.providerFactory.index, r);
          (o = a.slice(0, s)), Ff(i, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), Ff(i, o);
        return o;
      }
      function Ff(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function Te(e, t = []) {
        return (n) => {
          n.providersResolver = (r, i) =>
            (function xx(e, t, n) {
              const r = ie();
              if (r.firstCreatePass) {
                const i = dn(e);
                Of(n, r.data, r.blueprint, i, !0),
                  Of(t, r.data, r.blueprint, i, !1);
              }
            })(r, i ? i(e) : e, t);
        };
      }
      class io {}
      class AC {}
      class kf extends io {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new j_(this));
          const i = Ut(t);
          (this._bootstrapComponents = Xn(i.bootstrap)),
            (this._r3Injector = v_(
              t,
              n,
              [
                { provide: io, useValue: this },
                { provide: ts, useValue: this.componentFactoryResolver },
                ...r,
              ],
              Ke(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Lf extends AC {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new kf(this.moduleType, t, []);
        }
      }
      class RC extends io {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new j_(this)),
            (this.instance = null);
          const n = new $d(
            [
              ...t.providers,
              { provide: io, useValue: this },
              { provide: ts, useValue: this.componentFactoryResolver },
            ],
            t.parent || ml(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Vf(e, t, n = null) {
        return new RC({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let Ux = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Uv(0, n.type),
                i =
                  r.length > 0
                    ? Vf([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, i);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = O({
            token: e,
            providedIn: "environment",
            factory: () => new e(w(Rn)),
          })),
          e
        );
      })();
      function Hl(e) {
        e.getStandaloneInjector = (t) =>
          t.get(Ux).getOrCreateStandaloneInjector(e);
      }
      function nr(e, t, n, r) {
        return LC(b(), pt(), e, t, n, r);
      }
      function LC(e, t, n, r, i, o) {
        const s = t + n;
        return ct(e, s, i)
          ? (function On(e, t, n) {
              return (e[t] = n);
            })(e, s + 1, o ? r.call(o, i) : r(i))
          : (function ws(e, t) {
              const n = e[t];
              return n === X ? void 0 : n;
            })(e, s + 1);
      }
      function Uf(e, t) {
        const n = ie();
        let r;
        const i = e + re;
        n.firstCreatePass
          ? ((r = (function iF(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[i] = r),
            r.onDestroy && (n.destroyHooks ??= []).push(i, r.onDestroy))
          : (r = n.data[i]);
        const o = r.factory || (r.factory = Hr(r.type)),
          s = Ct(_);
        try {
          const a = qa(!1),
            l = o();
          return (
            qa(a),
            (function j1(e, t, n, r) {
              n >= e.data.length &&
                ((e.data[n] = null), (e.blueprint[n] = null)),
                (t[n] = r);
            })(n, b(), i, l),
            l
          );
        } finally {
          Ct(s);
        }
      }
      function Bf(e, t, n) {
        const r = e + re,
          i = b(),
          o = (function Ti(e, t) {
            return e[t];
          })(i, r);
        return (function Es(e, t) {
          return e[x].data[t].pure;
        })(i, r)
          ? LC(i, pt(), t, o.transform, n, o)
          : o.transform(n);
      }
      function Hf(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Se = class uF extends ke {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let i = t,
            o = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (i = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = Hf(o)), i && (i = Hf(i)), s && (s = Hf(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return t instanceof Lt && t.add(a), a;
        }
      };
      function cF() {
        return this._results[Symbol.iterator]();
      }
      class $f {
        get changes() {
          return this._changes || (this._changes = new Se());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = $f.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = cF);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const i = (function Jt(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function aR(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let i = e[r],
                o = t[r];
              if ((n && ((i = n(i)), (o = n(o))), o !== i)) return !1;
            }
            return !0;
          })(r._results, i, n)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let rr = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = hF), e;
      })();
      const dF = rr,
        fF = class extends dF {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n, null);
          }
          createEmbeddedViewImpl(t, n, r) {
            const s = this._declarationTContainer.tView,
              a = bl(
                this._declarationLView,
                s,
                t,
                4096 & this._declarationLView[Z] ? 4096 : 16,
                null,
                s.declTNode,
                null,
                null,
                null,
                n || null,
                r || null
              );
            a[Fo] = this._declarationLView[this._declarationTContainer.index];
            const u = this._declarationLView[En];
            return (
              null !== u && (a[En] = u.createEmbeddedView(s)),
              mf(s, a, t),
              new as(a)
            );
          }
        };
      function hF() {
        return $l(it(), b());
      }
      function $l(e, t) {
        return 4 & e.type ? new fF(t, e, Hi(e, t)) : null;
      }
      let pn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = DF), e;
      })();
      function DF() {
        return WC(it(), b());
      }
      const CF = pn,
        GC = class extends CF {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Hi(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Pi(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ld(this._hostTNode, this._hostLView);
            if (Ty(t)) {
              const n = Ga(t, this._hostLView),
                r = za(t);
              return new Pi(n[x].data[r + 8], n);
            }
            return new Pi(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = qC(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - lt;
          }
          createEmbeddedView(t, n, r) {
            let i, o;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (o = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, o, null);
            return this.insertImpl(a, i, false), a;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function Bo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (i = g.projectableNodes),
                (o = g.environmentInjector || g.ngModuleRef);
            }
            const l = s ? t : new ls(ae(t)),
              u = r || this.parentInjector;
            if (!o && null == l.ngModule) {
              const m = (s ? u : this.parentInjector).get(Rn, null);
              m && (o = m);
            }
            ae(l.componentType ?? {});
            const h = l.create(u, i, null, o);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const i = t._lView,
              o = i[x];
            if (
              (function bA(e) {
                return St(e[Re]);
              })(i)
            ) {
              const l = this.indexOf(t);
              if (-1 !== l) this.detach(l);
              else {
                const u = i[Re],
                  c = new GC(u, u[at], u[Re]);
                c.detach(c.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            if (
              ((function QR(e, t, n, r) {
                const i = lt + r,
                  o = n.length;
                r > 0 && (n[i - 1][cn] = t),
                  r < o - lt
                    ? ((t[cn] = n[i]), jy(n, lt + r, t))
                    : (n.push(t), (t[cn] = null)),
                  (t[Re] = n);
                const s = t[Fo];
                null !== s &&
                  n !== s &&
                  (function ZR(e, t) {
                    const n = e[Mi];
                    t[Ue] !== t[Re][Re][Ue] && (e[Gm] = !0),
                      null === n ? (e[Mi] = [t]) : n.push(t);
                  })(s, t);
                const a = t[En];
                null !== a && a.insertView(e), (t[Z] |= 128);
              })(o, i, a, s),
              !r)
            ) {
              const l = Ad(s, a),
                u = i[Y],
                c = al(u, a[bn]);
              null !== c &&
                (function qR(e, t, n, r, i, o) {
                  (r[Qe] = i), (r[at] = t), Ko(e, r, n, 1, i, o);
                })(o, a[at], u, i, c, l);
            }
            return t.attachToViewContainerRef(), jy(Gf(a), s, t), t;
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = qC(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Sd(this._lContainer, n);
            r && (Za(Gf(this._lContainer), n), dv(r[x], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Sd(this._lContainer, n);
            return r && null != Za(Gf(this._lContainer), n) ? new as(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function qC(e) {
        return e[8];
      }
      function Gf(e) {
        return e[8] || (e[8] = []);
      }
      function WC(e, t) {
        let n;
        const r = t[e.index];
        return (
          St(r)
            ? (n = r)
            : ((n = I_(r, t, null, e)), (t[e.index] = n), Sl(t, n)),
          KC(n, t, e, r),
          new GC(n, e, t)
        );
      }
      let KC = function QC(e, t, n, r) {
        if (e[bn]) return;
        let i;
        (i =
          8 & n.type
            ? be(r)
            : (function wF(e, t) {
                const n = e[Y],
                  r = n.createComment(""),
                  i = Mt(t, e);
                return (
                  Gr(
                    n,
                    al(n, i),
                    r,
                    (function eP(e, t) {
                      return e.nextSibling(t);
                    })(n, i),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[bn] = i);
      };
      class qf {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new qf(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Wf {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              i = [];
            for (let o = 0; o < r; o++) {
              const s = n.getByIndex(o);
              i.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Wf(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== rw(t, n).matches && this.queries[n].setDirty();
        }
      }
      class ZC {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class Kf {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== n ? n.length : 0,
              o = this.getByIndex(r).embeddedTView(t, i);
            o &&
              ((o.indexInDeclarationView = r),
              null !== n ? n.push(o) : (n = [o]));
          }
          return null !== n ? new Kf(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Qf {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Qf(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const o = r[i];
              this.matchTNodeWithReadOption(t, n, SF(n, o)),
                this.matchTNodeWithReadOption(t, n, Ka(n, t, o, !1, !1));
            }
          else
            r === rr
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Ka(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === Pt || i === pn || (i === rr && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const o = Ka(n, t, i, !1, !1);
                null !== o && this.addMatch(n.index, o);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function SF(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function TF(e, t, n, r) {
        return -1 === n
          ? (function MF(e, t) {
              return 11 & e.type ? Hi(e, t) : 4 & e.type ? $l(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function IF(e, t, n) {
              return n === Pt
                ? Hi(t, e)
                : n === rr
                ? $l(t, e)
                : n === pn
                ? WC(t, e)
                : void 0;
            })(e, t, r)
          : zr(e, e[x], n, t);
      }
      function YC(e, t, n, r) {
        const i = t[En].queries[r];
        if (null === i.matches) {
          const o = e.data,
            s = n.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const u = s[l];
            a.push(u < 0 ? null : TF(t, o[u], s[l + 1], n.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function Zf(e, t, n, r) {
        const i = e.queries.getByIndex(n),
          o = i.matches;
        if (null !== o) {
          const s = YC(e, t, i, n);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) r.push(s[a / 2]);
            else {
              const u = o[a + 1],
                c = t[-l];
              for (let d = lt; d < c.length; d++) {
                const f = c[d];
                f[Fo] === f[Re] && Zf(f[x], f, u, r);
              }
              if (null !== c[Mi]) {
                const d = c[Mi];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Zf(h[x], h, u, r);
                }
              }
            }
          }
        }
        return r;
      }
      function XC(e) {
        const t = b(),
          n = ie(),
          r = yy();
        td(r + 1);
        const i = rw(n, r);
        if (
          e.dirty &&
          (function wA(e) {
            return 4 == (4 & e[Z]);
          })(t) ===
            (2 == (2 & i.metadata.flags))
        ) {
          if (null === i.matches) e.reset([]);
          else {
            const o = i.crossesNgTemplate ? Zf(n, t, r, []) : YC(n, t, i, r);
            e.reset(o, nO), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function JC(e, t, n, r) {
        const i = ie();
        if (i.firstCreatePass) {
          const o = it();
          (function nw(e, t, n) {
            null === e.queries && (e.queries = new Kf()),
              e.queries.track(new Qf(t, n));
          })(i, new ZC(t, n, r), o.index),
            (function PF(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) &&
                n.push(e.queries.length - 1, t);
            })(i, e),
            2 == (2 & n) && (i.staticContentQueries = !0);
        }
        !(function tw(e, t, n) {
          const r = new $f(4 == (4 & n));
          (function bO(e, t, n, r) {
            const i = R_(t);
            i.push(n), e.firstCreatePass && P_(e).push(r, i.length - 1);
          })(e, t, r, r.destroy),
            null === t[En] && (t[En] = new Wf()),
            t[En].queries.push(new qf(r));
        })(i, b(), n);
      }
      function rw(e, t) {
        return e.queries.getByIndex(t);
      }
      const nh = new S("Application Initializer");
      let rh = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = M(nh, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const i of this.appInits) {
                const o = i();
                if (gs(o)) n.push(o);
                else if (uD(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((i) => {
                  this.reject(i);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Dw = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const ir = new S("LocaleId", {
        providedIn: "root",
        factory: () =>
          M(ir, U.Optional | U.SkipSelf) ||
          (function JF() {
            return (typeof $localize < "u" && $localize.locale) || ro;
          })(),
      });
      let Gl = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new rt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class tk {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Cw = (() => {
        class e {
          compileModuleSync(n) {
            return new Lf(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = Xn(Ut(n).declarations).reduce((s, a) => {
                const l = ae(a);
                return l && s.push(new ls(l)), s;
              }, []);
            return new tk(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ik = (() => Promise.resolve(0))();
      function ih(e) {
        typeof Zone > "u"
          ? ik.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      function bw(...e) {}
      class me {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Se(!1)),
            (this.onMicrotaskEmpty = new Se(!1)),
            (this.onStable = new Se(!1)),
            (this.onError = new Se(!1)),
            typeof Zone > "u")
          )
            throw new v(908, !1);
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function ok() {
              let e = we.requestAnimationFrame,
                t = we.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function lk(e) {
              const t = () => {
                !(function ak(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(we, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                sh(e),
                                (e.isCheckStableRunning = !0),
                                oh(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    sh(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return Sw(e), n.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Mw(e);
                  }
                },
                onInvoke: (n, r, i, o, s, a, l) => {
                  try {
                    return Sw(e), n.invoke(i, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Mw(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          sh(e),
                          oh(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!me.isInAngularZone()) throw new v(909, !1);
        }
        static assertNotInAngularZone() {
          if (me.isInAngularZone()) throw new v(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, sk, bw, bw);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const sk = {};
      function oh(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function sh(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Sw(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Mw(e) {
        e._nesting--, oh(e);
      }
      class uk {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Se()),
            (this.onMicrotaskEmpty = new Se()),
            (this.onStable = new Se()),
            (this.onError = new Se());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      const Tw = new S("", { providedIn: "root", factory: Iw });
      function Iw() {
        const e = M(me);
        let t = !0;
        return Pc(
          new De((i) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                i.next(t), i.complete();
              });
          }),
          new De((i) => {
            let o;
            e.runOutsideAngular(() => {
              o = e.onStable.subscribe(() => {
                me.assertNotInAngularZone(),
                  ih(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), i.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              me.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    i.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Dm())
        );
      }
      const Aw = new S(""),
        ql = new S("");
      let uh,
        ah = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                uh ||
                  ((function ck(e) {
                    uh = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      me.assertNotInAngularZone(),
                        ih(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ih(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(me), w(lh), w(ql));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        lh = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return uh?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        Sr = null;
      const Rw = new S("AllowMultipleToken"),
        ch = new S("PlatformDestroyListeners"),
        dh = new S("appBootstrapListener");
      class Ow {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function xw(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new S(r);
        return (o = []) => {
          let s = fh();
          if (!s || s.injector.get(Rw, !1)) {
            const a = [...n, ...o, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function hk(e) {
                  if (Sr && !Sr.get(Rw, !1)) throw new v(400, !1);
                  (function Pw() {
                    !(function fA(e) {
                      Ym = e;
                    })(() => {
                      throw new v(600, !1);
                    });
                  })(),
                    (Sr = e);
                  const t = e.get(kw);
                  (function Nw(e) {
                    e.get(Gv, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function Fw(e = [], t) {
                    return Ot.create({
                      name: t,
                      providers: [
                        { provide: Bd, useValue: "platform" },
                        { provide: ch, useValue: new Set([() => (Sr = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function gk(e) {
            const t = fh();
            if (!t) throw new v(401, !1);
            return t;
          })();
        };
      }
      function fh() {
        return Sr?.get(kw) ?? null;
      }
      let kw = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function mk(e = "zone.js", t) {
              return "noop" === e ? new uk() : "zone.js" === e ? new me(t) : e;
            })(
              r?.ngZone,
              (function Lw(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return i.run(() => {
              const o = (function jx(e, t, n) {
                  return new kf(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function Hw(e) {
                    return [
                      { provide: me, useFactory: e },
                      {
                        provide: Wr,
                        multi: !0,
                        useFactory: () => {
                          const t = M(vk, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: Bw, useFactory: yk },
                      { provide: Tw, useFactory: Iw },
                    ];
                  })(() => i)
                ),
                s = o.injector.get(Er, null);
              return (
                i.runOutsideAngular(() => {
                  const a = i.onError.subscribe({
                    next: (l) => {
                      s.handleError(l);
                    },
                  });
                  o.onDestroy(() => {
                    Wl(this._modules, o), a.unsubscribe();
                  });
                }),
                (function Vw(e, t, n) {
                  try {
                    const r = n();
                    return gs(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, i, () => {
                  const a = o.injector.get(rh);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function iC(e) {
                          Yt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (rC = e.toLowerCase().replace(/_/g, "-"));
                        })(o.injector.get(ir, ro) || ro),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = jw({}, r);
            return (function dk(e, t, n) {
              const r = new Lf(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(or);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new v(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new v(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(ch, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Ot));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function jw(e, t) {
        return Array.isArray(t) ? t.reduce(jw, e) : { ...e, ...t };
      }
      let or = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = M(Bw)),
              (this.zoneIsStable = M(Tw)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = M(Gl).hasPendingTasks.pipe(
                Vt((n) => (n ? H(!1) : this.zoneIsStable)),
                Cm(),
                Dm()
              )),
              (this._injector = M(Rn));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof Jv;
            if (!this._injector.get(rh).done)
              throw (
                (!i &&
                  (function Ci(e) {
                    const t = ae(e) || st(e) || bt(e);
                    return null !== t && t.standalone;
                  })(n),
                new v(405, !1))
              );
            let s;
            (s = i ? n : this._injector.get(ts).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function fk(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(io),
              u = s.create(Ot.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(Aw, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Wl(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new v(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Wl(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(dh, []);
            r.push(...this._bootstrapListeners), r.forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Wl(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new v(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Wl(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const Bw = new S("", {
        providedIn: "root",
        factory: () => M(Er).handleError.bind(void 0),
      });
      function yk() {
        const e = M(me),
          t = M(Er);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let vk = (() => {
        class e {
          constructor() {
            (this.zone = M(me)), (this.applicationRef = M(or));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      let Kl = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = Ck), e;
      })();
      function Ck(e) {
        return (function wk(e, t, n) {
          if (Br(e) && !n) {
            const r = Ht(e.index, t);
            return new as(r, r);
          }
          return 47 & e.type ? new as(t[Ue], t) : null;
        })(it(), b(), 16 == (16 & e));
      }
      class qw {
        constructor() {}
        supports(t) {
          return Rl(t);
        }
        create(t) {
          return new Ik(t);
        }
      }
      const Tk = (e, t) => t;
      class Ik {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Tk);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Kw(r, i, o)) ? n : r,
              a = Kw(s, i, o),
              l = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  c <= p && p < u && (o[f] = h + 1);
                }
                o[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Rl(t))) throw new v(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function v1(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new Ak(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Ww()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Ww()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Ak {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Rk {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Ww {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new Rk()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Kw(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      class Qw {
        constructor() {}
        supports(t) {
          return t instanceof Map || yf(t);
        }
        create() {
          return new Pk();
        }
      }
      class Pk {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || yf(t))) throw new v(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const o = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, o);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const i = this._records.get(t);
            this._maybeAddToChanges(i, n);
            const o = i._prev,
              s = i._next;
            return (
              o && (o._next = s),
              s && (s._prev = o),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new Ok(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class Ok {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Zw() {
        return new Yl([new qw()]);
      }
      let Yl = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Zw()),
              deps: [[e, new Ja(), new Xa()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new v(901, !1);
          }
        }
        return (e.ɵprov = O({ token: e, providedIn: "root", factory: Zw })), e;
      })();
      function Yw() {
        return new Ss([new Qw()]);
      }
      let Ss = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Yw()),
              deps: [[e, new Ja(), new Xa()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new v(901, !1);
          }
        }
        return (e.ɵprov = O({ token: e, providedIn: "root", factory: Yw })), e;
      })();
      const Fk = xw(null, "core", []);
      let kk = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(or));
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({})),
          e
        );
      })();
      function ao(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let _h = null;
      function Mr() {
        return _h;
      }
      class Kk {}
      const Xe = new S("DocumentToken");
      let Dh = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return M(Zk);
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const Qk = new S("Location Initialized");
      let Zk = (() => {
        class e extends Dh {
          constructor() {
            super(),
              (this._doc = M(Xe)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Mr().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Mr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Mr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, i) {
            this._history.pushState(n, r, i);
          }
          replaceState(n, r, i) {
            this._history.replaceState(n, r, i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Ch(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function iE(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function sr(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let ei = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return M(sE);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const oE = new S("appBaseHref");
      let sE = (() => {
          class e extends ei {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  M(Xe).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Ch(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  sr(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + sr(o));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + sr(o));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(Dh), w(oE, 8));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Yk = (() => {
          class e extends ei {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Ch(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + sr(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + sr(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(Dh), w(oE, 8));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        wh = (() => {
          class e {
            constructor(n) {
              (this._subject = new Se()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function eL(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(iE(aE(r)))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + sr(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function Jk(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, aE(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._locationStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + sr(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._locationStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + sr(r)),
                  i
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = sr),
            (e.joinWithSlash = Ch),
            (e.stripTrailingSlash = iE),
            (e.ɵfac = function (n) {
              return new (n || e)(w(ei));
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return (function Xk() {
                  return new wh(w(ei));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function aE(e) {
        return e.replace(/\/index.html$/, "");
      }
      function mE(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (i.trim() === t) return decodeURIComponent(o);
        }
        return null;
      }
      const Oh = /\s+/,
        yE = [];
      let Nh = (() => {
        class e {
          constructor(n, r, i, o) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = i),
              (this._renderer = o),
              (this.initialClasses = yE),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(Oh) : yE;
          }
          set ngClass(n) {
            this.rawClass = "string" == typeof n ? n.trim().split(Oh) : n;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set)
              for (const r of n) this._updateState(r, !0);
            else if (null != n)
              for (const r of Object.keys(n)) this._updateState(r, !!n[r]);
            this._applyStateDiff();
          }
          _updateState(n, r) {
            const i = this.stateMap.get(n);
            void 0 !== i
              ? (i.enabled !== r && ((i.changed = !0), (i.enabled = r)),
                (i.touched = !0))
              : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const r = n[0],
                i = n[1];
              i.changed
                ? (this._toggleClass(r, i.enabled), (i.changed = !1))
                : i.touched ||
                  (i.enabled && this._toggleClass(r, !1),
                  this.stateMap.delete(r)),
                (i.touched = !1);
            }
          }
          _toggleClass(n, r) {
            (n = n.trim()).length > 0 &&
              n.split(Oh).forEach((i) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, i)
                  : this._renderer.removeClass(this._ngEl.nativeElement, i);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Yl), _(Ss), _(Pt), _(Yn));
          }),
          (e.ɵdir = G({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class VL {
        constructor(t, n, r, i) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let _E = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new VL(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), DE(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              DE(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(pn), _(rr), _(Yl));
          }),
          (e.ɵdir = G({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function DE(e, t) {
        e.context.$implicit = t.item;
      }
      let lr = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new jL()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            CE("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            CE("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(pn), _(rr));
          }),
          (e.ɵdir = G({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class jL {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function CE(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${Ke(t)}'.`
          );
      }
      class HL {
        createSubscription(t, n) {
          return Jm(() =>
            t.subscribe({
              next: n,
              error: (r) => {
                throw r;
              },
            })
          );
        }
        dispose(t) {
          Jm(() => t.unsubscribe());
        }
      }
      class $L {
        createSubscription(t, n) {
          return t.then(n, (r) => {
            throw r;
          });
        }
        dispose(t) {}
      }
      const zL = new $L(),
        GL = new HL();
      let kh = (() => {
          class e {
            constructor(n) {
              (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null),
                (this._ref = n);
            }
            ngOnDestroy() {
              this._subscription && this._dispose(), (this._ref = null);
            }
            transform(n) {
              return this._obj
                ? n !== this._obj
                  ? (this._dispose(), this.transform(n))
                  : this._latestValue
                : (n && this._subscribe(n), this._latestValue);
            }
            _subscribe(n) {
              (this._obj = n),
                (this._strategy = this._selectStrategy(n)),
                (this._subscription = this._strategy.createSubscription(
                  n,
                  (r) => this._updateLatestValue(n, r)
                ));
            }
            _selectStrategy(n) {
              if (gs(n)) return zL;
              if (uD(n)) return GL;
              throw (function yn(e, t) {
                return new v(2100, !1);
              })();
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(n, r) {
              n === this._obj &&
                ((this._latestValue = r), this._ref.markForCheck());
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Kl, 16));
            }),
            (e.ɵpipe = Et({
              name: "async",
              type: e,
              pure: !1,
              standalone: !0,
            })),
            e
          );
        })(),
        bE = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      function ME(e) {
        return "server" === e;
      }
      let fV = (() => {
        class e {}
        return (
          (e.ɵprov = O({
            token: e,
            providedIn: "root",
            factory: () => new hV(w(Xe), window),
          })),
          e
        );
      })();
      class hV {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function pV(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              TE(this.window.history) ||
              TE(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function TE(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class IE {}
      class LV extends Kk {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Bh extends LV {
        static makeCurrent() {
          !(function Wk(e) {
            _h || (_h = e);
          })(new Bh());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function VV() {
            return (
              (As = As || document.querySelector("base")),
              As ? As.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function jV(e) {
                (cu = cu || document.createElement("a")),
                  cu.setAttribute("href", e);
                const t = cu.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          As = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return mE(document.cookie, t);
        }
      }
      let cu,
        As = null,
        BV = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Hh = new S("EventManagerPlugins");
      let NE = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((o) => o.supports(n))), !r))
              throw new v(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Hh), w(me));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class xE {
        constructor(t) {
          this._doc = t;
        }
      }
      const $h = "ng-app-id";
      let FE = (() => {
        class e {
          constructor(n, r, i, o = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = i),
              (this.platformId = o),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = ME(o)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((i) => i.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${$h}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((i) => {
                  null != i.textContent && r.set(i.textContent, i);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const i = this.styleRef;
            if (i.has(n)) {
              const o = i.get(n);
              return (o.usage += r), o.usage;
            }
            return i.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const i = this.styleNodesInDOM,
              o = i?.get(r);
            if (o?.parentNode === n)
              return i.delete(r), o.removeAttribute($h), o;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute($h, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const i = this.getStyleElement(n, r);
            n.appendChild(i);
            const o = this.styleRef,
              s = o.get(r)?.elements;
            s ? s.push(i) : o.set(r, { elements: [i], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Xe), w(yl), w(Wv, 8), w(Qr));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const zh = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Gh = /%COMP%/g,
        GV = new S("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function LE(e, t) {
        return t.map((n) => n.replace(Gh, e));
      }
      let qh = (() => {
        class e {
          constructor(n, r, i, o, s, a, l, u = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.removeStylesOnCompDestory = o),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = l),
              (this.nonce = u),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = ME(a)),
              (this.defaultRenderer = new Wh(n, s, l, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === wt.ShadowDom &&
              (r = { ...r, encapsulation: wt.Emulated });
            const i = this.getOrCreateRenderer(n, r);
            return (
              i instanceof jE
                ? i.applyToHost(n)
                : i instanceof Kh && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(n, r) {
            const i = this.rendererByCompId;
            let o = i.get(r.id);
            if (!o) {
              const s = this.doc,
                a = this.ngZone,
                l = this.eventManager,
                u = this.sharedStylesHost,
                c = this.removeStylesOnCompDestory,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case wt.Emulated:
                  o = new jE(l, u, r, this.appId, c, s, a, d);
                  break;
                case wt.ShadowDom:
                  return new QV(l, u, n, r, s, a, this.nonce, d);
                default:
                  o = new Kh(l, u, r, c, s, a, d);
              }
              (o.onDestroy = () => i.delete(r.id)), i.set(r.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              w(NE),
              w(FE),
              w(yl),
              w(GV),
              w(Xe),
              w(Qr),
              w(me),
              w(Wv)
            );
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Wh {
        constructor(t, n, r, i) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = i),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(zh[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (VE(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (VE(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new v(5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = zh[i];
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = zh[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (At.DashCase | At.Important)
            ? t.style.setProperty(n, r, i & At.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & At.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Mr().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function VE(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class QV extends Wh {
        constructor(t, n, r, i, o, s, a, l) {
          super(t, o, s, l),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const u = LE(i.id, i.styles);
          for (const c of u) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Kh extends Wh {
        constructor(t, n, r, i, o, s, a, l) {
          super(t, o, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = i),
            (this.rendererUsageCount = 0),
            (this.styles = l ? LE(l, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class jE extends Kh {
        constructor(t, n, r, i, o, s, a, l) {
          const u = i + "-" + r.id;
          super(t, n, r, o, s, a, l, u),
            (this.contentAttr = (function qV(e) {
              return "_ngcontent-%COMP%".replace(Gh, e);
            })(u)),
            (this.hostAttr = (function WV(e) {
              return "_nghost-%COMP%".replace(Gh, e);
            })(u));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let ZV = (() => {
        class e extends xE {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Xe));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const UE = ["alt", "control", "meta", "shift"],
        YV = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        XV = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let JV = (() => {
        class e extends xE {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Mr().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              UE.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let i = YV[n.key] || n.key,
              o = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (o = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                UE.forEach((s) => {
                  s !== i && (0, XV[s])(n) && (o += s + ".");
                }),
                (o += i),
                o === r)
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Xe));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const r2 = xw(Fk, "browser", [
          { provide: Qr, useValue: "browser" },
          {
            provide: Gv,
            useValue: function e2() {
              Bh.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Xe,
            useFactory: function n2() {
              return (
                (function lP(e) {
                  Od = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        i2 = new S(""),
        $E = [
          {
            provide: ql,
            useClass: class UV {
              addToWindow(t) {
                (we.getAngularTestability = (r, i = !0) => {
                  const o = t.findTestabilityInTree(r, i);
                  if (null == o) throw new v(5103, !1);
                  return o;
                }),
                  (we.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (we.getAllAngularRootElements = () => t.getAllRootElements()),
                  we.frameworkStabilizers || (we.frameworkStabilizers = []),
                  we.frameworkStabilizers.push((r) => {
                    const i = we.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && r(s);
                    };
                    i.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Mr().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Aw, useClass: ah, deps: [me, lh, ql] },
          { provide: ah, useClass: ah, deps: [me, lh, ql] },
        ],
        zE = [
          { provide: Bd, useValue: "root" },
          {
            provide: Er,
            useFactory: function t2() {
              return new Er();
            },
            deps: [],
          },
          { provide: Hh, useClass: ZV, multi: !0, deps: [Xe, me, Qr] },
          { provide: Hh, useClass: JV, multi: !0, deps: [Xe] },
          qh,
          FE,
          NE,
          { provide: ns, useExisting: qh },
          { provide: IE, useClass: BV, deps: [] },
          [],
        ];
      let GE = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: yl, useValue: n.appId }],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(i2, 12));
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ providers: [...zE, ...$E], imports: [bE, kk] })),
            e
          );
        })(),
        qE = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(Xe));
            }),
            (e.ɵprov = O({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function s2() {
                        return new qE(w(Xe));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      let QE = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function (n) {
                let r = null;
                return (r = n ? new (n || e)() : w(ZE)), r;
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        ZE = (() => {
          class e extends QE {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case _e.NONE:
                  return r;
                case _e.HTML:
                  return An(r, "HTML")
                    ? zt(r)
                    : Nv(this._doc, String(r)).toString();
                case _e.STYLE:
                  return An(r, "Style") ? zt(r) : r;
                case _e.SCRIPT:
                  if (An(r, "Script")) return zt(r);
                  throw new v(5200, !1);
                case _e.URL:
                  return An(r, "URL") ? zt(r) : fl(String(r));
                case _e.RESOURCE_URL:
                  if (An(r, "ResourceURL")) return zt(r);
                  throw new v(5201, !1);
                default:
                  throw new v(5202, !1);
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function gP(e) {
                return new uP(e);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function mP(e) {
                return new cP(e);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function yP(e) {
                return new dP(e);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function vP(e) {
                return new fP(e);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function _P(e) {
                return new hP(e);
              })(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(Xe));
            }),
            (e.ɵprov = O({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function c2(e) {
                        return new ZE(e.get(Xe));
                      })(w(Ot))),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class XE {}
      class d2 {}
      const ur = "*";
      function f2(e, t) {
        return { type: 7, name: e, definitions: t, options: {} };
      }
      function JE(e, t = null) {
        return { type: 4, styles: t, timings: e };
      }
      function eb(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function Rs(e) {
        return { type: 6, styles: e, offset: null };
      }
      function Zh(e, t, n) {
        return { type: 0, name: e, styles: t, options: n };
      }
      function tb(e, t, n = null) {
        return { type: 1, expr: e, animation: t, options: n };
      }
      function nb(e) {
        Promise.resolve().then(e);
      }
      class Ps {
        constructor(t = 0, n = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + n);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          nb(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const n = "start" == t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class rb {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let n = 0,
            r = 0,
            i = 0;
          const o = this.players.length;
          0 == o
            ? nb(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++n == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++r == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++i == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const n = t * this.totalTime;
          this.players.forEach((r) => {
            const i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(i);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (n, r) => (null === n || r.totalTime > n.totalTime ? r : n),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const n = "start" == t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      function ib(e) {
        return new v(3e3, !1);
      }
      function Ir(e) {
        switch (e.length) {
          case 0:
            return new Ps();
          case 1:
            return e[0];
          default:
            return new rb(e);
        }
      }
      function ob(e, t, n = new Map(), r = new Map()) {
        const i = [],
          o = [];
        let s = -1,
          a = null;
        if (
          (t.forEach((l) => {
            const u = l.get("offset"),
              c = u == s,
              d = (c && a) || new Map();
            l.forEach((f, h) => {
              let p = h,
                g = f;
              if ("offset" !== h)
                switch (((p = e.normalizePropertyName(p, i)), g)) {
                  case "!":
                    g = n.get(h);
                    break;
                  case ur:
                    g = r.get(h);
                    break;
                  default:
                    g = e.normalizeStyleValue(h, p, g, i);
                }
              d.set(p, g);
            }),
              c || o.push(d),
              (a = d),
              (s = u);
          }),
          i.length)
        )
          throw (function F2(e) {
            return new v(3502, !1);
          })();
        return o;
      }
      function Xh(e, t, n, r) {
        switch (t) {
          case "start":
            e.onStart(() => r(n && Jh(n, "start", e)));
            break;
          case "done":
            e.onDone(() => r(n && Jh(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => r(n && Jh(n, "destroy", e)));
        }
      }
      function Jh(e, t, n) {
        const o = ep(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            t || e.phaseName,
            n.totalTime ?? e.totalTime,
            !!n.disabled
          ),
          s = e._data;
        return null != s && (o._data = s), o;
      }
      function ep(e, t, n, r, i = "", o = 0, s) {
        return {
          element: e,
          triggerName: t,
          fromState: n,
          toState: r,
          phaseName: i,
          totalTime: o,
          disabled: !!s,
        };
      }
      function Wt(e, t, n) {
        let r = e.get(t);
        return r || e.set(t, (r = n)), r;
      }
      function sb(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.slice(t + 1)];
      }
      const W2 = (() =>
        typeof document > "u" ? null : document.documentElement)();
      function tp(e) {
        const t = e.parentNode || e.host || null;
        return t === W2 ? null : t;
      }
      let ti = null,
        ab = !1;
      function lb(e, t) {
        for (; t; ) {
          if (t === e) return !0;
          t = tp(t);
        }
        return !1;
      }
      function ub(e, t, n) {
        if (n) return Array.from(e.querySelectorAll(t));
        const r = e.querySelector(t);
        return r ? [r] : [];
      }
      let cb = (() => {
          class e {
            validateStyleProperty(n) {
              return (function Q2(e) {
                ti ||
                  ((ti =
                    (function Z2() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (ab = !!ti.style && "WebkitAppearance" in ti.style));
                let t = !0;
                return (
                  ti.style &&
                    !(function K2(e) {
                      return "ebkit" == e.substring(1, 6);
                    })(e) &&
                    ((t = e in ti.style),
                    !t &&
                      ab &&
                      (t =
                        "Webkit" + e.charAt(0).toUpperCase() + e.slice(1) in
                        ti.style)),
                  t
                );
              })(n);
            }
            matchesElement(n, r) {
              return !1;
            }
            containsElement(n, r) {
              return lb(n, r);
            }
            getParentElement(n) {
              return tp(n);
            }
            query(n, r, i) {
              return ub(n, r, i);
            }
            computeStyle(n, r, i) {
              return i || "";
            }
            animate(n, r, i, o, s, a = [], l) {
              return new Ps(i, o);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        np = (() => {
          class e {}
          return (e.NOOP = new cb()), e;
        })();
      const Y2 = 1e3,
        rp = "ng-enter",
        du = "ng-leave",
        fu = "ng-trigger",
        hu = ".ng-trigger",
        fb = "ng-animating",
        ip = ".ng-animating";
      function cr(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : op(parseFloat(t[1]), t[2]);
      }
      function op(e, t) {
        return "s" === t ? e * Y2 : e;
      }
      function pu(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function J2(e, t, n) {
              let i,
                o = 0,
                s = "";
              if ("string" == typeof e) {
                const a = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return t.push(ib()), { duration: 0, delay: 0, easing: "" };
                i = op(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = op(parseFloat(l), a[4]));
                const u = a[5];
                u && (s = u);
              } else i = e;
              if (!n) {
                let a = !1,
                  l = t.length;
                i < 0 &&
                  (t.push(
                    (function h2() {
                      return new v(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (t.push(
                      (function p2() {
                        return new v(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(l, 0, ib());
              }
              return { duration: i, delay: o, easing: s };
            })(e, t, n);
      }
      function Os(e, t = {}) {
        return (
          Object.keys(e).forEach((n) => {
            t[n] = e[n];
          }),
          t
        );
      }
      function hb(e) {
        const t = new Map();
        return (
          Object.keys(e).forEach((n) => {
            t.set(n, e[n]);
          }),
          t
        );
      }
      function Ar(e, t = new Map(), n) {
        if (n) for (let [r, i] of n) t.set(r, i);
        for (let [r, i] of e) t.set(r, i);
        return t;
      }
      function Fn(e, t, n) {
        t.forEach((r, i) => {
          const o = ap(i);
          n && !n.has(i) && n.set(i, e.style[o]), (e.style[o] = r);
        });
      }
      function ni(e, t) {
        t.forEach((n, r) => {
          const i = ap(r);
          e.style[i] = "";
        });
      }
      function Ns(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : eb(e)) : e;
      }
      const sp = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function gb(e) {
        let t = [];
        if ("string" == typeof e) {
          let n;
          for (; (n = sp.exec(e)); ) t.push(n[1]);
          sp.lastIndex = 0;
        }
        return t;
      }
      function xs(e, t, n) {
        const r = e.toString(),
          i = r.replace(sp, (o, s) => {
            let a = t[s];
            return (
              null == a &&
                (n.push(
                  (function m2(e) {
                    return new v(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? e : i;
      }
      function gu(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const nj = /-+([a-z0-9])/g;
      function ap(e) {
        return e.replace(nj, (...t) => t[1].toUpperCase());
      }
      function Kt(e, t, n) {
        switch (t.type) {
          case 7:
            return e.visitTrigger(t, n);
          case 0:
            return e.visitState(t, n);
          case 1:
            return e.visitTransition(t, n);
          case 2:
            return e.visitSequence(t, n);
          case 3:
            return e.visitGroup(t, n);
          case 4:
            return e.visitAnimate(t, n);
          case 5:
            return e.visitKeyframes(t, n);
          case 6:
            return e.visitStyle(t, n);
          case 8:
            return e.visitReference(t, n);
          case 9:
            return e.visitAnimateChild(t, n);
          case 10:
            return e.visitAnimateRef(t, n);
          case 11:
            return e.visitQuery(t, n);
          case 12:
            return e.visitStagger(t, n);
          default:
            throw (function y2(e) {
              return new v(3004, !1);
            })();
        }
      }
      function mb(e, t) {
        return window.getComputedStyle(e)[t];
      }
      const mu = "*";
      function oj(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach((r) =>
                (function sj(e, t, n) {
                  if (":" == e[0]) {
                    const l = (function aj(e, t) {
                      switch (e) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (n, r) => parseFloat(r) > parseFloat(n);
                        case ":decrement":
                          return (n, r) => parseFloat(r) < parseFloat(n);
                        default:
                          return (
                            t.push(
                              (function P2(e) {
                                return new v(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(e, n);
                    if ("function" == typeof l) return void t.push(l);
                    e = l;
                  }
                  const r = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        (function R2(e) {
                          return new v(3015, !1);
                        })()
                      ),
                      t
                    );
                  const i = r[1],
                    o = r[2],
                    s = r[3];
                  t.push(yb(i, s));
                  "<" == o[0] && !(i == mu && s == mu) && t.push(yb(s, i));
                })(r, n, t)
              )
            : n.push(e),
          n
        );
      }
      const yu = new Set(["true", "1"]),
        vu = new Set(["false", "0"]);
      function yb(e, t) {
        const n = yu.has(e) || vu.has(e),
          r = yu.has(t) || vu.has(t);
        return (i, o) => {
          let s = e == mu || e == i,
            a = t == mu || t == o;
          return (
            !s && n && "boolean" == typeof i && (s = i ? yu.has(e) : vu.has(e)),
            !a && r && "boolean" == typeof o && (a = o ? yu.has(t) : vu.has(t)),
            s && a
          );
        };
      }
      const lj = new RegExp("s*:selfs*,?", "g");
      function lp(e, t, n, r) {
        return new uj(e).build(t, n, r);
      }
      class uj {
        constructor(t) {
          this._driver = t;
        }
        build(t, n, r) {
          const i = new fj(n);
          return this._resetContextStyleTimingState(i), Kt(this, Ns(t), i);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set("", new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, n) {
          let r = (n.queryCount = 0),
            i = (n.depCount = 0);
          const o = [],
            s = [];
          return (
            "@" == t.name.charAt(0) &&
              n.errors.push(
                (function _2() {
                  return new v(3006, !1);
                })()
              ),
            t.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(n), 0 == a.type)) {
                const l = a,
                  u = l.name;
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((c) => {
                    (l.name = c), o.push(this.visitState(l, n));
                  }),
                  (l.name = u);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, n);
                (r += l.queryCount), (i += l.depCount), s.push(l);
              } else
                n.errors.push(
                  (function D2() {
                    return new v(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: t.name,
              states: o,
              transitions: s,
              queryCount: r,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(t, n) {
          const r = this.visitStyle(t.styles, n),
            i = (t.options && t.options.params) || null;
          if (r.containsDynamicStyles) {
            const o = new Set(),
              s = i || {};
            r.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((l) => {
                  gb(l).forEach((u) => {
                    s.hasOwnProperty(u) || o.add(u);
                  });
                });
            }),
              o.size &&
                (gu(o.values()),
                n.errors.push(
                  (function C2(e, t) {
                    return new v(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: t.name,
            style: r,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(t, n) {
          (n.queryCount = 0), (n.depCount = 0);
          const r = Kt(this, Ns(t.animation), n);
          return {
            type: 1,
            matchers: oj(t.expr, n.errors),
            animation: r,
            queryCount: n.queryCount,
            depCount: n.depCount,
            options: ri(t.options),
          };
        }
        visitSequence(t, n) {
          return {
            type: 2,
            steps: t.steps.map((r) => Kt(this, r, n)),
            options: ri(t.options),
          };
        }
        visitGroup(t, n) {
          const r = n.currentTime;
          let i = 0;
          const o = t.steps.map((s) => {
            n.currentTime = r;
            const a = Kt(this, s, n);
            return (i = Math.max(i, n.currentTime)), a;
          });
          return (
            (n.currentTime = i), { type: 3, steps: o, options: ri(t.options) }
          );
        }
        visitAnimate(t, n) {
          const r = (function pj(e, t) {
            if (e.hasOwnProperty("duration")) return e;
            if ("number" == typeof e) return up(pu(e, t).duration, 0, "");
            const n = e;
            if (
              n
                .split(/\s+/)
                .some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))
            ) {
              const o = up(0, 0, "");
              return (o.dynamic = !0), (o.strValue = n), o;
            }
            const i = pu(n, t);
            return up(i.duration, i.delay, i.easing);
          })(t.timings, n.errors);
          n.currentAnimateTimings = r;
          let i,
            o = t.styles ? t.styles : Rs({});
          if (5 == o.type) i = this.visitKeyframes(o, n);
          else {
            let s = t.styles,
              a = !1;
            if (!s) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (s = Rs(u));
            }
            n.currentTime += r.duration + r.delay;
            const l = this.visitStyle(s, n);
            (l.isEmptyStep = a), (i = l);
          }
          return (
            (n.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          );
        }
        visitStyle(t, n) {
          const r = this._makeStyleAst(t, n);
          return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(t, n) {
          const r = [],
            i = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let a of i)
            "string" == typeof a
              ? a === ur
                ? r.push(a)
                : n.errors.push(new v(3002, !1))
              : r.push(hb(a));
          let o = !1,
            s = null;
          return (
            r.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !o)
              )
                for (let l of a.values())
                  if (l.toString().indexOf("{{") >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(t, n) {
          const r = n.currentAnimateTimings;
          let i = n.currentTime,
            o = n.currentTime;
          r && o > 0 && (o -= r.duration + r.delay),
            t.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, l) => {
                  const u = n.collectedStyles.get(n.currentQuerySelector),
                    c = u.get(l);
                  let d = !0;
                  c &&
                    (o != i &&
                      o >= c.startTime &&
                      i <= c.endTime &&
                      (n.errors.push(
                        (function E2(e, t, n, r, i) {
                          return new v(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (o = c.startTime)),
                    d && u.set(l, { startTime: o, endTime: i }),
                    n.options &&
                      (function tj(e, t, n) {
                        const r = t.params || {},
                          i = gb(e);
                        i.length &&
                          i.forEach((o) => {
                            r.hasOwnProperty(o) ||
                              n.push(
                                (function g2(e) {
                                  return new v(3001, !1);
                                })()
                              );
                          });
                      })(a, n.options, n.errors);
                });
            });
        }
        visitKeyframes(t, n) {
          const r = { type: 5, styles: [], options: null };
          if (!n.currentAnimateTimings)
            return (
              n.errors.push(
                (function b2() {
                  return new v(3011, !1);
                })()
              ),
              r
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            u = 0;
          const c = t.steps.map((C) => {
            const y = this._makeStyleAst(C, n);
            let A =
                null != y.offset
                  ? y.offset
                  : (function hj(e) {
                      if ("string" == typeof e) return null;
                      let t = null;
                      if (Array.isArray(e))
                        e.forEach((n) => {
                          if (n instanceof Map && n.has("offset")) {
                            const r = n;
                            (t = parseFloat(r.get("offset"))),
                              r.delete("offset");
                          }
                        });
                      else if (e instanceof Map && e.has("offset")) {
                        const n = e;
                        (t = parseFloat(n.get("offset"))), n.delete("offset");
                      }
                      return t;
                    })(y.styles),
              F = 0;
            return (
              null != A && (o++, (F = y.offset = A)),
              (l = l || F < 0 || F > 1),
              (a = a || F < u),
              (u = F),
              s.push(F),
              y
            );
          });
          l &&
            n.errors.push(
              (function S2() {
                return new v(3012, !1);
              })()
            ),
            a &&
              n.errors.push(
                (function M2() {
                  return new v(3200, !1);
                })()
              );
          const d = t.steps.length;
          let f = 0;
          o > 0 && o < d
            ? n.errors.push(
                (function T2() {
                  return new v(3202, !1);
                })()
              )
            : 0 == o && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            g = n.currentAnimateTimings,
            m = g.duration;
          return (
            c.forEach((C, y) => {
              const A = f > 0 ? (y == h ? 1 : f * y) : s[y],
                F = A * m;
              (n.currentTime = p + g.delay + F),
                (g.duration = F),
                this._validateStyleAst(C, n),
                (C.offset = A),
                r.styles.push(C);
            }),
            r
          );
        }
        visitReference(t, n) {
          return {
            type: 8,
            animation: Kt(this, Ns(t.animation), n),
            options: ri(t.options),
          };
        }
        visitAnimateChild(t, n) {
          return n.depCount++, { type: 9, options: ri(t.options) };
        }
        visitAnimateRef(t, n) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, n),
            options: ri(t.options),
          };
        }
        visitQuery(t, n) {
          const r = n.currentQuerySelector,
            i = t.options || {};
          n.queryCount++, (n.currentQuery = t);
          const [o, s] = (function cj(e) {
            const t = !!e.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              t && (e = e.replace(lj, "")),
              (e = e
                .replace(/@\*/g, hu)
                .replace(/@\w+/g, (n) => hu + "-" + n.slice(1))
                .replace(/:animating/g, ip)),
              [e, t]
            );
          })(t.selector);
          (n.currentQuerySelector = r.length ? r + " " + o : o),
            Wt(n.collectedStyles, n.currentQuerySelector, new Map());
          const a = Kt(this, Ns(t.animation), n);
          return (
            (n.currentQuery = null),
            (n.currentQuerySelector = r),
            {
              type: 11,
              selector: o,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: s,
              animation: a,
              originalSelector: t.selector,
              options: ri(t.options),
            }
          );
        }
        visitStagger(t, n) {
          n.currentQuery ||
            n.errors.push(
              (function I2() {
                return new v(3013, !1);
              })()
            );
          const r =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : pu(t.timings, n.errors, !0);
          return {
            type: 12,
            animation: Kt(this, Ns(t.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class fj {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function ri(e) {
        return (
          e
            ? (e = Os(e)).params &&
              (e.params = (function dj(e) {
                return e ? Os(e) : null;
              })(e.params))
            : (e = {}),
          e
        );
      }
      function up(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function cp(e, t, n, r, i, o, s = null, a = !1) {
        return {
          type: 1,
          element: e,
          keyframes: t,
          preStyleProps: n,
          postStyleProps: r,
          duration: i,
          delay: o,
          totalTime: i + o,
          easing: s,
          subTimeline: a,
        };
      }
      class _u {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, n) {
          let r = this._map.get(t);
          r || this._map.set(t, (r = [])), r.push(...n);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const yj = new RegExp(":enter", "g"),
        _j = new RegExp(":leave", "g");
      function dp(e, t, n, r, i, o = new Map(), s = new Map(), a, l, u = []) {
        return new Dj().buildKeyframes(e, t, n, r, i, o, s, a, l, u);
      }
      class Dj {
        buildKeyframes(t, n, r, i, o, s, a, l, u, c = []) {
          u = u || new _u();
          const d = new fp(t, n, u, i, o, c, []);
          d.options = l;
          const f = l.delay ? cr(l.delay) : 0;
          d.currentTimeline.delayNextStep(f),
            d.currentTimeline.setStyles([s], null, d.errors, l),
            Kt(this, r, d);
          const h = d.timelines.filter((p) => p.containsAnimation());
          if (h.length && a.size) {
            let p;
            for (let g = h.length - 1; g >= 0; g--) {
              const m = h[g];
              if (m.element === n) {
                p = m;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, d.errors, l);
          }
          return h.length
            ? h.map((p) => p.buildKeyframes())
            : [cp(n, [], [], [], 0, f, "", !1)];
        }
        visitTrigger(t, n) {}
        visitState(t, n) {}
        visitTransition(t, n) {}
        visitAnimateChild(t, n) {
          const r = n.subInstructions.get(n.element);
          if (r) {
            const i = n.createSubContext(t.options),
              o = n.currentTimeline.currentTime,
              s = this._visitSubInstructions(r, i, i.options);
            o != s && n.transformIntoNewTimeline(s);
          }
          n.previousNode = t;
        }
        visitAnimateRef(t, n) {
          const r = n.createSubContext(t.options);
          r.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [t.options, t.animation.options],
              n,
              r
            ),
            this.visitReference(t.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = t);
        }
        _applyAnimationRefDelays(t, n, r) {
          for (const i of t) {
            const o = i?.delay;
            if (o) {
              const s =
                "number" == typeof o ? o : cr(xs(o, i?.params ?? {}, n.errors));
              r.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(t, n, r) {
          let o = n.currentTimeline.currentTime;
          const s = null != r.duration ? cr(r.duration) : null,
            a = null != r.delay ? cr(r.delay) : null;
          return (
            0 !== s &&
              t.forEach((l) => {
                const u = n.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, u.duration + u.delay);
              }),
            o
          );
        }
        visitReference(t, n) {
          n.updateOptions(t.options, !0),
            Kt(this, t.animation, n),
            (n.previousNode = t);
        }
        visitSequence(t, n) {
          const r = n.subContextCount;
          let i = n;
          const o = t.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((i = n.createSubContext(o)),
            i.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = Du));
            const s = cr(o.delay);
            i.delayNextStep(s);
          }
          t.steps.length &&
            (t.steps.forEach((s) => Kt(this, s, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (n.previousNode = t);
        }
        visitGroup(t, n) {
          const r = [];
          let i = n.currentTimeline.currentTime;
          const o = t.options && t.options.delay ? cr(t.options.delay) : 0;
          t.steps.forEach((s) => {
            const a = n.createSubContext(t.options);
            o && a.delayNextStep(o),
              Kt(this, s, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((s) => n.currentTimeline.mergeTimelineCollectedStyles(s)),
            n.transformIntoNewTimeline(i),
            (n.previousNode = t);
        }
        _visitTiming(t, n) {
          if (t.dynamic) {
            const r = t.strValue;
            return pu(n.params ? xs(r, n.params, n.errors) : r, n.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, n) {
          const r = (n.currentAnimateTimings = this._visitTiming(t.timings, n)),
            i = n.currentTimeline;
          r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
          const o = t.style;
          5 == o.type
            ? this.visitKeyframes(o, n)
            : (n.incrementTime(r.duration),
              this.visitStyle(o, n),
              i.applyStylesToKeyframe()),
            (n.currentAnimateTimings = null),
            (n.previousNode = t);
        }
        visitStyle(t, n) {
          const r = n.currentTimeline,
            i = n.currentAnimateTimings;
          !i && r.hasCurrentStyleProperties() && r.forwardFrame();
          const o = (i && i.easing) || t.easing;
          t.isEmptyStep
            ? r.applyEmptyStep(o)
            : r.setStyles(t.styles, o, n.errors, n.options),
            (n.previousNode = t);
        }
        visitKeyframes(t, n) {
          const r = n.currentAnimateTimings,
            i = n.currentTimeline.duration,
            o = r.duration,
            a = n.createSubContext().currentTimeline;
          (a.easing = r.easing),
            t.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, n.errors, n.options),
                a.applyStylesToKeyframe();
            }),
            n.currentTimeline.mergeTimelineCollectedStyles(a),
            n.transformIntoNewTimeline(i + o),
            (n.previousNode = t);
        }
        visitQuery(t, n) {
          const r = n.currentTimeline.currentTime,
            i = t.options || {},
            o = i.delay ? cr(i.delay) : 0;
          o &&
            (6 === n.previousNode.type ||
              (0 == r && n.currentTimeline.hasCurrentStyleProperties())) &&
            (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = Du));
          let s = r;
          const a = n.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!i.optional,
            n.errors
          );
          n.currentQueryTotal = a.length;
          let l = null;
          a.forEach((u, c) => {
            n.currentQueryIndex = c;
            const d = n.createSubContext(t.options, u);
            o && d.delayNextStep(o),
              u === n.element && (l = d.currentTimeline),
              Kt(this, t.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (n.currentQueryIndex = 0),
            (n.currentQueryTotal = 0),
            n.transformIntoNewTimeline(s),
            l &&
              (n.currentTimeline.mergeTimelineCollectedStyles(l),
              n.currentTimeline.snapshotCurrentStyles()),
            (n.previousNode = t);
        }
        visitStagger(t, n) {
          const r = n.parentContext,
            i = n.currentTimeline,
            o = t.timings,
            s = Math.abs(o.duration),
            a = s * (n.currentQueryTotal - 1);
          let l = s * n.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = r.currentStaggerTime;
          }
          const c = n.currentTimeline;
          l && c.delayNextStep(l);
          const d = c.currentTime;
          Kt(this, t.animation, n),
            (n.previousNode = t),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
        }
      }
      const Du = {};
      class fp {
        constructor(t, n, r, i, o, s, a, l) {
          (this._driver = t),
            (this.element = n),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Du),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new Cu(this._driver, n, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, n) {
          if (!t) return;
          const r = t;
          let i = this.options;
          null != r.duration && (i.duration = cr(r.duration)),
            null != r.delay && (i.delay = cr(r.delay));
          const o = r.params;
          if (o) {
            let s = i.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach((a) => {
                (!n || !s.hasOwnProperty(a)) &&
                  (s[a] = xs(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const n = this.options.params;
            if (n) {
              const r = (t.params = {});
              Object.keys(n).forEach((i) => {
                r[i] = n[i];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, n, r) {
          const i = n || this.element,
            o = new fp(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(t),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = Du),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, n, r) {
          const i = {
              duration: n ?? t.duration,
              delay: this.currentTimeline.currentTime + (r ?? 0) + t.delay,
              easing: "",
            },
            o = new Cj(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              i,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(o), i;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, n, r, i, o, s) {
          let a = [];
          if ((i && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(yj, "." + this._enterClassName)).replace(
              _j,
              "." + this._leaveClassName
            );
            let u = this._driver.query(this.element, t, 1 != r);
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function A2(e) {
                  return new v(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class Cu {
        constructor(t, n, r, i) {
          (this._driver = t),
            (this.element = n),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this.easing = null),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(n)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                n,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const n = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || n
            ? (this.forwardTime(this.currentTime + t),
              n && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, n) {
          return (
            this.applyStylesToKeyframe(),
            new Cu(
              this._driver,
              t,
              n || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, n) {
          this._localTimelineStyles.set(t, n),
            this._globalTimelineStyles.set(t, n),
            this._styleSummary.set(t, { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set("easing", t);
          for (let [n, r] of this._globalTimelineStyles)
            this._backFill.set(n, r || ur), this._currentKeyframe.set(n, ur);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, n, r, i) {
          n && this._previousKeyframe.set("easing", n);
          const o = (i && i.params) || {},
            s = (function wj(e, t) {
              const n = new Map();
              let r;
              return (
                e.forEach((i) => {
                  if ("*" === i) {
                    r = r || t.keys();
                    for (let o of r) n.set(o, ur);
                  } else Ar(i, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const u = xs(l, o, r);
            this._pendingStyles.set(a, u),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? ur),
              this._updateStyle(a, u);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, n) => {
              this._currentKeyframe.set(n, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, n) => {
              this._currentKeyframe.has(n) || this._currentKeyframe.set(n, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, n] of this._localTimelineStyles)
            this._pendingStyles.set(t, n), this._updateStyle(t, n);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let n in this._currentKeyframe) t.push(n);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((n, r) => {
            const i = this._styleSummary.get(r);
            (!i || n.time > i.time) && this._updateStyle(r, n.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            n = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((a, l) => {
            const u = Ar(a, new Map(), this._backFill);
            u.forEach((c, d) => {
              "!" === c ? t.add(d) : c === ur && n.add(d);
            }),
              r || u.set("offset", l / this.duration),
              i.push(u);
          });
          const o = t.size ? gu(t.values()) : [],
            s = n.size ? gu(n.values()) : [];
          if (r) {
            const a = i[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
          }
          return cp(
            this.element,
            i,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class Cj extends Cu {
        constructor(t, n, r, i, o, s, a = !1) {
          super(t, n, s.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: n, duration: r, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && n) {
            const o = [],
              s = r + n,
              a = n / s,
              l = Ar(t[0]);
            l.set("offset", 0), o.push(l);
            const u = Ar(t[0]);
            u.set("offset", Db(a)), o.push(u);
            const c = t.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = Ar(t[d]);
              const h = f.get("offset");
              f.set("offset", Db((n + h * r) / s)), o.push(f);
            }
            (r = s), (n = 0), (i = ""), (t = o);
          }
          return cp(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            r,
            n,
            i,
            !0
          );
        }
      }
      function Db(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class hp {}
      const Ej = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class bj extends hp {
        normalizePropertyName(t, n) {
          return ap(t);
        }
        normalizeStyleValue(t, n, r, i) {
          let o = "";
          const s = r.toString().trim();
          if (Ej.has(n) && 0 !== r && "0" !== r)
            if ("number" == typeof r) o = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(
                  (function v2(e, t) {
                    return new v(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function Cb(e, t, n, r, i, o, s, a, l, u, c, d, f) {
        return {
          type: 0,
          element: e,
          triggerName: t,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: o,
          toState: r,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f,
        };
      }
      const pp = {};
      class wb {
        constructor(t, n, r) {
          (this._triggerName = t), (this.ast = n), (this._stateStyles = r);
        }
        match(t, n, r, i) {
          return (function Sj(e, t, n, r, i) {
            return e.some((o) => o(t, n, r, i));
          })(this.ast.matchers, t, n, r, i);
        }
        buildStyles(t, n, r) {
          let i = this._stateStyles.get("*");
          return (
            void 0 !== t && (i = this._stateStyles.get(t?.toString()) || i),
            i ? i.buildStyles(n, r) : new Map()
          );
        }
        build(t, n, r, i, o, s, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || pp,
            p = this.buildStyles(r, (a && a.params) || pp, d),
            g = (l && l.params) || pp,
            m = this.buildStyles(i, g, d),
            C = new Set(),
            y = new Map(),
            A = new Map(),
            F = "void" === i,
            V = { params: Mj(g, f), delay: this.ast.options?.delay },
            fe = c ? [] : dp(t, n, this.ast.animation, o, s, p, m, V, u, d);
          let Ge = 0;
          if (
            (fe.forEach((Dn) => {
              Ge = Math.max(Dn.duration + Dn.delay, Ge);
            }),
            d.length)
          )
            return Cb(n, this._triggerName, r, i, F, p, m, [], [], y, A, Ge, d);
          fe.forEach((Dn) => {
            const mr = Dn.element,
              bT = Wt(y, mr, new Set());
            Dn.preStyleProps.forEach((mi) => bT.add(mi));
            const ma = Wt(A, mr, new Set());
            Dn.postStyleProps.forEach((mi) => ma.add(mi)),
              mr !== n && C.add(mr);
          });
          const _n = gu(C.values());
          return Cb(n, this._triggerName, r, i, F, p, m, fe, _n, y, A, Ge);
        }
      }
      function Mj(e, t) {
        const n = Os(t);
        for (const r in e) e.hasOwnProperty(r) && null != e[r] && (n[r] = e[r]);
        return n;
      }
      class Tj {
        constructor(t, n, r) {
          (this.styles = t), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(t, n) {
          const r = new Map(),
            i = Os(this.defaultParams);
          return (
            Object.keys(t).forEach((o) => {
              const s = t[o];
              null !== s && (i[o] = s);
            }),
            this.styles.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((s, a) => {
                  s && (s = xs(s, i, n));
                  const l = this.normalizer.normalizePropertyName(a, n);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, n)),
                    r.set(a, s);
                });
            }),
            r
          );
        }
      }
      class Aj {
        constructor(t, n, r) {
          (this.name = t),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            n.states.forEach((i) => {
              this.states.set(
                i.name,
                new Tj(i.style, (i.options && i.options.params) || {}, r)
              );
            }),
            Eb(this.states, "true", "1"),
            Eb(this.states, "false", "0"),
            n.transitions.forEach((i) => {
              this.transitionFactories.push(new wb(t, i, this.states));
            }),
            (this.fallbackTransition = (function Rj(e, t, n) {
              return new wb(
                e,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, n, r, i) {
          return (
            this.transitionFactories.find((s) => s.match(t, n, r, i)) || null
          );
        }
        matchStyles(t, n, r) {
          return this.fallbackTransition.buildStyles(t, n, r);
        }
      }
      function Eb(e, t, n) {
        e.has(t)
          ? e.has(n) || e.set(n, e.get(t))
          : e.has(n) && e.set(t, e.get(n));
      }
      const Pj = new _u();
      class Oj {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this._driver = n),
            (this._normalizer = r),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, n) {
          const r = [],
            o = lp(this._driver, n, r, []);
          if (r.length)
            throw (function k2(e) {
              return new v(3503, !1);
            })();
          this._animations.set(t, o);
        }
        _buildPlayer(t, n, r) {
          const i = t.element,
            o = ob(this._normalizer, t.keyframes, n, r);
          return this._driver.animate(
            i,
            o,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, n, r = {}) {
          const i = [],
            o = this._animations.get(t);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = dp(
                  this._driver,
                  n,
                  o,
                  rp,
                  du,
                  new Map(),
                  new Map(),
                  r,
                  Pj,
                  i
                )),
                s.forEach((c) => {
                  const d = Wt(a, c.element, new Map());
                  c.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (i.push(
                  (function L2() {
                    return new v(3300, !1);
                  })()
                ),
                (s = [])),
            i.length)
          )
            throw (function V2(e) {
              return new v(3504, !1);
            })();
          a.forEach((c, d) => {
            c.forEach((f, h) => {
              c.set(h, this._driver.computeStyle(d, h, ur));
            });
          });
          const u = Ir(
            s.map((c) => {
              const d = a.get(c.element);
              return this._buildPlayer(c, new Map(), d);
            })
          );
          return (
            this._playersById.set(t, u),
            u.onDestroy(() => this.destroy(t)),
            this.players.push(u),
            u
          );
        }
        destroy(t) {
          const n = this._getPlayer(t);
          n.destroy(), this._playersById.delete(t);
          const r = this.players.indexOf(n);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(t) {
          const n = this._playersById.get(t);
          if (!n)
            throw (function j2(e) {
              return new v(3301, !1);
            })();
          return n;
        }
        listen(t, n, r, i) {
          const o = ep(n, "", "", "");
          return Xh(this._getPlayer(t), r, o, i), () => {};
        }
        command(t, n, r, i) {
          if ("register" == r) return void this.register(t, i[0]);
          if ("create" == r) return void this.create(t, n, i[0] || {});
          const o = this._getPlayer(t);
          switch (r) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const bb = "ng-animate-queued",
        gp = "ng-animate-disabled",
        Lj = [],
        Sb = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        Vj = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        rn = "__ng_removed";
      class mp {
        get params() {
          return this.options.params;
        }
        constructor(t, n = "") {
          this.namespaceId = n;
          const r = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function Hj(e) {
              return e ?? null;
            })(r ? t.value : t)),
            r)
          ) {
            const o = Os(t);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(t) {
          const n = t.params;
          if (n) {
            const r = this.options.params;
            Object.keys(n).forEach((i) => {
              null == r[i] && (r[i] = n[i]);
            });
          }
        }
      }
      const Fs = "void",
        yp = new mp(Fs);
      class jj {
        constructor(t, n, r) {
          (this.id = t),
            (this.hostElement = n),
            (this._engine = r),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            on(n, this._hostClassName);
        }
        listen(t, n, r, i) {
          if (!this._triggers.has(n))
            throw (function U2(e, t) {
              return new v(3302, !1);
            })();
          if (null == r || 0 == r.length)
            throw (function B2(e) {
              return new v(3303, !1);
            })();
          if (
            !(function $j(e) {
              return "start" == e || "done" == e;
            })(r)
          )
            throw (function H2(e, t) {
              return new v(3400, !1);
            })();
          const o = Wt(this._elementListeners, t, []),
            s = { name: n, phase: r, callback: i };
          o.push(s);
          const a = Wt(this._engine.statesByElement, t, new Map());
          return (
            a.has(n) || (on(t, fu), on(t, fu + "-" + n), a.set(n, yp)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(n) || a.delete(n);
              });
            }
          );
        }
        register(t, n) {
          return !this._triggers.has(t) && (this._triggers.set(t, n), !0);
        }
        _getTrigger(t) {
          const n = this._triggers.get(t);
          if (!n)
            throw (function $2(e) {
              return new v(3401, !1);
            })();
          return n;
        }
        trigger(t, n, r, i = !0) {
          const o = this._getTrigger(n),
            s = new vp(this.id, n, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (on(t, fu),
            on(t, fu + "-" + n),
            this._engine.statesByElement.set(t, (a = new Map())));
          let l = a.get(n);
          const u = new mp(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            a.set(n, u),
            l || (l = yp),
            u.value !== Fs && l.value === u.value)
          ) {
            if (
              !(function qj(e, t) {
                const n = Object.keys(e),
                  r = Object.keys(t);
                if (n.length != r.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (!t.hasOwnProperty(o) || e[o] !== t[o]) return !1;
                }
                return !0;
              })(l.params, u.params)
            ) {
              const g = [],
                m = o.matchStyles(l.value, l.params, g),
                C = o.matchStyles(u.value, u.params, g);
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    ni(t, m), Fn(t, C);
                  });
            }
            return;
          }
          const f = Wt(this._engine.playersByElement, t, []);
          f.forEach((g) => {
            g.namespaceId == this.id &&
              g.triggerName == n &&
              g.queued &&
              g.destroy();
          });
          let h = o.matchTransition(l.value, u.value, t, u.params),
            p = !1;
          if (!h) {
            if (!i) return;
            (h = o.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: n,
              transition: h,
              fromState: l,
              toState: u,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              (on(t, bb),
              s.onStart(() => {
                lo(t, bb);
              })),
            s.onDone(() => {
              let g = this.players.indexOf(s);
              g >= 0 && this.players.splice(g, 1);
              const m = this._engine.playersByElement.get(t);
              if (m) {
                let C = m.indexOf(s);
                C >= 0 && m.splice(C, 1);
              }
            }),
            this.players.push(s),
            f.push(s),
            s
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach((n) => n.delete(t)),
            this._elementListeners.forEach((n, r) => {
              this._elementListeners.set(
                r,
                n.filter((i) => i.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const n = this._engine.playersByElement.get(t);
          n &&
            (n.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, n) {
          const r = this._engine.driver.query(t, hu, !0);
          r.forEach((i) => {
            if (i[rn]) return;
            const o = this._engine.fetchNamespacesByElement(i);
            o.size
              ? o.forEach((s) => s.triggerLeaveAnimation(i, n, !1, !0))
              : this.clearElementCache(i);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((i) => this.clearElementCache(i))
            );
        }
        triggerLeaveAnimation(t, n, r, i) {
          const o = this._engine.statesByElement.get(t),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, u) => {
                if ((s.set(u, l.value), this._triggers.has(u))) {
                  const c = this.trigger(t, u, Fs, i);
                  c && a.push(c);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, n, s),
                r && Ir(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const n = this._elementListeners.get(t),
            r = this._engine.statesByElement.get(t);
          if (n && r) {
            const i = new Set();
            n.forEach((o) => {
              const s = o.name;
              if (i.has(s)) return;
              i.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                u = r.get(s) || yp,
                c = new mp(Fs),
                d = new vp(this.id, s, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: s,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, n) {
          const r = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, n),
            this.triggerLeaveAnimation(t, n, !0))
          )
            return;
          let i = !1;
          if (r.totalAnimations) {
            const o = r.players.length ? r.playersByQueriedElement.get(t) : [];
            if (o && o.length) i = !0;
            else {
              let s = t;
              for (; (s = s.parentNode); )
                if (r.statesByElement.get(s)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), i))
            r.markElementAsRemoved(this.id, t, !1, n);
          else {
            const o = t[rn];
            (!o || o === Sb) &&
              (r.afterFlush(() => this.clearElementCache(t)),
              r.destroyInnerAnimations(t),
              r._onRemovalComplete(t, n));
          }
        }
        insertNode(t, n) {
          on(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const n = [];
          return (
            this._queue.forEach((r) => {
              const i = r.player;
              if (i.destroyed) return;
              const o = r.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const l = ep(
                      o,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = t), Xh(r.player, a.phase, l, a.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : n.push(r);
            }),
            (this._queue = []),
            n.sort((r, i) => {
              const o = r.transition.ast.depCount,
                s = i.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((n) => n.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let n = !1;
          return (
            this._elementListeners.has(t) && (n = !0),
            (n = !!this._queue.find((r) => r.element === t) || n),
            n
          );
        }
      }
      class Uj {
        _onRemovalComplete(t, n) {
          this.onRemovalComplete(t, n);
        }
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this.driver = n),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, o) => {});
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((n) => {
              n.players.forEach((r) => {
                r.queued && t.push(r);
              });
            }),
            t
          );
        }
        createNamespace(t, n) {
          const r = new jj(t, n, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, n)
              ? this._balanceNamespaceList(r, n)
              : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
            (this._namespaceLookup[t] = r)
          );
        }
        _balanceNamespaceList(t, n) {
          const r = this._namespaceList,
            i = this.namespacesByHostElement;
          if (r.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(n);
            for (; a; ) {
              const l = i.get(a);
              if (l) {
                const u = r.indexOf(l);
                r.splice(u + 1, 0, t), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || r.unshift(t);
          } else r.push(t);
          return i.set(n, t), t;
        }
        register(t, n) {
          let r = this._namespaceLookup[t];
          return r || (r = this.createNamespace(t, n)), r;
        }
        registerTrigger(t, n, r) {
          let i = this._namespaceLookup[t];
          i && i.register(n, r) && this.totalAnimations++;
        }
        destroy(t, n) {
          if (!t) return;
          const r = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[t];
            const i = this._namespaceList.indexOf(r);
            i >= 0 && this._namespaceList.splice(i, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(n));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const n = new Set(),
            r = this.statesByElement.get(t);
          if (r)
            for (let i of r.values())
              if (i.namespaceId) {
                const o = this._fetchNamespace(i.namespaceId);
                o && n.add(o);
              }
          return n;
        }
        trigger(t, n, r, i) {
          if (wu(n)) {
            const o = this._fetchNamespace(t);
            if (o) return o.trigger(n, r, i), !0;
          }
          return !1;
        }
        insertNode(t, n, r, i) {
          if (!wu(n)) return;
          const o = n[rn];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(n);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(n, r);
          }
          i && this.collectEnterElement(n);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, n) {
          n
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), on(t, gp))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), lo(t, gp));
        }
        removeNode(t, n, r) {
          if (wu(n)) {
            const i = t ? this._fetchNamespace(t) : null;
            i ? i.removeNode(n, r) : this.markElementAsRemoved(t, n, !1, r);
            const o = this.namespacesByHostElement.get(n);
            o && o.id !== t && o.removeNode(n, r);
          } else this._onRemovalComplete(n, r);
        }
        markElementAsRemoved(t, n, r, i, o) {
          this.collectedLeaveElements.push(n),
            (n[rn] = {
              namespaceId: t,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(t, n, r, i, o) {
          return wu(n) ? this._fetchNamespace(t).listen(n, r, i, o) : () => {};
        }
        _buildInstruction(t, n, r, i, o) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            r,
            i,
            t.fromState.options,
            t.toState.options,
            n,
            o
          );
        }
        destroyInnerAnimations(t) {
          let n = this.driver.query(t, hu, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(t, ip, !0)),
              n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(t) {
          const n = this.playersByElement.get(t);
          n &&
            n.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const n = this.playersByQueriedElement.get(t);
          n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Ir(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const n = t[rn];
          if (n && n.setForRemoval) {
            if (((t[rn] = Sb), n.namespaceId)) {
              this.destroyInnerAnimations(t);
              const r = this._fetchNamespace(n.namespaceId);
              r && r.clearElementCache(t);
            }
            this._onRemovalComplete(t, n.setForRemoval);
          }
          t.classList?.contains(gp) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(t = -1) {
          let n = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              on(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              n = this._flushAnimations(r, t);
            } finally {
              for (let i = 0; i < r.length; i++) r[i]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              n.length
                ? Ir(n).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(t) {
          throw (function z2(e) {
            return new v(3402, !1);
          })();
        }
        _flushAnimations(t, n) {
          const r = new _u(),
            i = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set();
          this.disabledNodes.forEach((k) => {
            c.add(k);
            const j = this.driver.query(k, ".ng-animate-queued", !0);
            for (let z = 0; z < j.length; z++) c.add(j[z]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = Ib(f, this.collectedEnterElements),
            p = new Map();
          let g = 0;
          h.forEach((k, j) => {
            const z = rp + g++;
            p.set(j, z), k.forEach((oe) => on(oe, z));
          });
          const m = [],
            C = new Set(),
            y = new Set();
          for (let k = 0; k < this.collectedLeaveElements.length; k++) {
            const j = this.collectedLeaveElements[k],
              z = j[rn];
            z &&
              z.setForRemoval &&
              (m.push(j),
              C.add(j),
              z.hasAnimation
                ? this.driver
                    .query(j, ".ng-star-inserted", !0)
                    .forEach((oe) => C.add(oe))
                : y.add(j));
          }
          const A = new Map(),
            F = Ib(f, Array.from(C));
          F.forEach((k, j) => {
            const z = du + g++;
            A.set(j, z), k.forEach((oe) => on(oe, z));
          }),
            t.push(() => {
              h.forEach((k, j) => {
                const z = p.get(j);
                k.forEach((oe) => lo(oe, z));
              }),
                F.forEach((k, j) => {
                  const z = A.get(j);
                  k.forEach((oe) => lo(oe, z));
                }),
                m.forEach((k) => {
                  this.processLeaveNode(k);
                });
            });
          const V = [],
            fe = [];
          for (let k = this._namespaceList.length - 1; k >= 0; k--)
            this._namespaceList[k].drainQueuedTransitions(n).forEach((z) => {
              const oe = z.player,
                nt = z.element;
              if ((V.push(oe), this.collectedEnterElements.length)) {
                const ht = nt[rn];
                if (ht && ht.setForMove) {
                  if (
                    ht.previousTriggersValues &&
                    ht.previousTriggersValues.has(z.triggerName)
                  ) {
                    const yi = ht.previousTriggersValues.get(z.triggerName),
                      sn = this.statesByElement.get(z.element);
                    if (sn && sn.has(z.triggerName)) {
                      const vc = sn.get(z.triggerName);
                      (vc.value = yi), sn.set(z.triggerName, vc);
                    }
                  }
                  return void oe.destroy();
                }
              }
              const Hn = !d || !this.driver.containsElement(d, nt),
                Zt = A.get(nt),
                Lr = p.get(nt),
                Ne = this._buildInstruction(z, r, Lr, Zt, Hn);
              if (Ne.errors && Ne.errors.length) return void fe.push(Ne);
              if (Hn)
                return (
                  oe.onStart(() => ni(nt, Ne.fromStyles)),
                  oe.onDestroy(() => Fn(nt, Ne.toStyles)),
                  void i.push(oe)
                );
              if (z.isFallbackTransition)
                return (
                  oe.onStart(() => ni(nt, Ne.fromStyles)),
                  oe.onDestroy(() => Fn(nt, Ne.toStyles)),
                  void i.push(oe)
                );
              const TT = [];
              Ne.timelines.forEach((ht) => {
                (ht.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(ht.element) || TT.push(ht);
              }),
                (Ne.timelines = TT),
                r.append(nt, Ne.timelines),
                s.push({ instruction: Ne, player: oe, element: nt }),
                Ne.queriedElements.forEach((ht) => Wt(a, ht, []).push(oe)),
                Ne.preStyleProps.forEach((ht, yi) => {
                  if (ht.size) {
                    let sn = l.get(yi);
                    sn || l.set(yi, (sn = new Set())),
                      ht.forEach((vc, Kg) => sn.add(Kg));
                  }
                }),
                Ne.postStyleProps.forEach((ht, yi) => {
                  let sn = u.get(yi);
                  sn || u.set(yi, (sn = new Set())),
                    ht.forEach((vc, Kg) => sn.add(Kg));
                });
            });
          if (fe.length) {
            const k = [];
            fe.forEach((j) => {
              k.push(
                (function G2(e, t) {
                  return new v(3505, !1);
                })()
              );
            }),
              V.forEach((j) => j.destroy()),
              this.reportError(k);
          }
          const Ge = new Map(),
            _n = new Map();
          s.forEach((k) => {
            const j = k.element;
            r.has(j) &&
              (_n.set(j, j),
              this._beforeAnimationBuild(
                k.player.namespaceId,
                k.instruction,
                Ge
              ));
          }),
            i.forEach((k) => {
              const j = k.element;
              this._getPreviousPlayers(
                j,
                !1,
                k.namespaceId,
                k.triggerName,
                null
              ).forEach((oe) => {
                Wt(Ge, j, []).push(oe), oe.destroy();
              });
            });
          const Dn = m.filter((k) => Rb(k, l, u)),
            mr = new Map();
          Tb(mr, this.driver, y, u, ur).forEach((k) => {
            Rb(k, l, u) && Dn.push(k);
          });
          const ma = new Map();
          h.forEach((k, j) => {
            Tb(ma, this.driver, new Set(k), l, "!");
          }),
            Dn.forEach((k) => {
              const j = mr.get(k),
                z = ma.get(k);
              mr.set(
                k,
                new Map([...(j?.entries() ?? []), ...(z?.entries() ?? [])])
              );
            });
          const mi = [],
            ST = [],
            MT = {};
          s.forEach((k) => {
            const { element: j, player: z, instruction: oe } = k;
            if (r.has(j)) {
              if (c.has(j))
                return (
                  z.onDestroy(() => Fn(j, oe.toStyles)),
                  (z.disabled = !0),
                  z.overrideTotalTime(oe.totalTime),
                  void i.push(z)
                );
              let nt = MT;
              if (_n.size > 1) {
                let Zt = j;
                const Lr = [];
                for (; (Zt = Zt.parentNode); ) {
                  const Ne = _n.get(Zt);
                  if (Ne) {
                    nt = Ne;
                    break;
                  }
                  Lr.push(Zt);
                }
                Lr.forEach((Ne) => _n.set(Ne, nt));
              }
              const Hn = this._buildAnimation(z.namespaceId, oe, Ge, o, ma, mr);
              if ((z.setRealPlayer(Hn), nt === MT)) mi.push(z);
              else {
                const Zt = this.playersByElement.get(nt);
                Zt && Zt.length && (z.parentPlayer = Ir(Zt)), i.push(z);
              }
            } else
              ni(j, oe.fromStyles),
                z.onDestroy(() => Fn(j, oe.toStyles)),
                ST.push(z),
                c.has(j) && i.push(z);
          }),
            ST.forEach((k) => {
              const j = o.get(k.element);
              if (j && j.length) {
                const z = Ir(j);
                k.setRealPlayer(z);
              }
            }),
            i.forEach((k) => {
              k.parentPlayer ? k.syncPlayerEvents(k.parentPlayer) : k.destroy();
            });
          for (let k = 0; k < m.length; k++) {
            const j = m[k],
              z = j[rn];
            if ((lo(j, du), z && z.hasAnimation)) continue;
            let oe = [];
            if (a.size) {
              let Hn = a.get(j);
              Hn && Hn.length && oe.push(...Hn);
              let Zt = this.driver.query(j, ip, !0);
              for (let Lr = 0; Lr < Zt.length; Lr++) {
                let Ne = a.get(Zt[Lr]);
                Ne && Ne.length && oe.push(...Ne);
              }
            }
            const nt = oe.filter((Hn) => !Hn.destroyed);
            nt.length ? zj(this, j, nt) : this.processLeaveNode(j);
          }
          return (
            (m.length = 0),
            mi.forEach((k) => {
              this.players.push(k),
                k.onDone(() => {
                  k.destroy();
                  const j = this.players.indexOf(k);
                  this.players.splice(j, 1);
                }),
                k.play();
            }),
            mi
          );
        }
        elementContainsData(t, n) {
          let r = !1;
          const i = n[rn];
          return (
            i && i.setForRemoval && (r = !0),
            this.playersByElement.has(n) && (r = !0),
            this.playersByQueriedElement.has(n) && (r = !0),
            this.statesByElement.has(n) && (r = !0),
            this._fetchNamespace(t).elementContainsData(n) || r
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, n, r, i, o) {
          let s = [];
          if (n) {
            const a = this.playersByQueriedElement.get(t);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const l = !o || o == Fs;
              a.forEach((u) => {
                u.queued || (!l && u.triggerName != i) || s.push(u);
              });
            }
          }
          return (
            (r || i) &&
              (s = s.filter(
                (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(t, n, r) {
          const o = n.element,
            s = n.isRemovalTransition ? void 0 : t,
            a = n.isRemovalTransition ? void 0 : n.triggerName;
          for (const l of n.timelines) {
            const u = l.element,
              c = u !== o,
              d = Wt(r, u, []);
            this._getPreviousPlayers(u, c, s, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          ni(o, n.fromStyles);
        }
        _buildAnimation(t, n, r, i, o, s) {
          const a = n.triggerName,
            l = n.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = n.timelines.map((p) => {
              const g = p.element;
              c.add(g);
              const m = g[rn];
              if (m && m.removedBeforeQueried)
                return new Ps(p.duration, p.delay);
              const C = g !== l,
                y = (function Gj(e) {
                  const t = [];
                  return Ab(e, t), t;
                })((r.get(g) || Lj).map((Ge) => Ge.getRealPlayer())).filter(
                  (Ge) => !!Ge.element && Ge.element === g
                ),
                A = o.get(g),
                F = s.get(g),
                V = ob(this._normalizer, p.keyframes, A, F),
                fe = this._buildPlayer(p, V, y);
              if ((p.subTimeline && i && d.add(g), C)) {
                const Ge = new vp(t, a, g);
                Ge.setRealPlayer(fe), u.push(Ge);
              }
              return fe;
            });
          u.forEach((p) => {
            Wt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function Bj(e, t, n) {
                  let r = e.get(t);
                  if (r) {
                    if (r.length) {
                      const i = r.indexOf(n);
                      r.splice(i, 1);
                    }
                    0 == r.length && e.delete(t);
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            c.forEach((p) => on(p, fb));
          const h = Ir(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => lo(p, fb)), Fn(l, n.toStyles);
            }),
            d.forEach((p) => {
              Wt(i, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(t, n, r) {
          return n.length > 0
            ? this.driver.animate(
                t.element,
                n,
                t.duration,
                t.delay,
                t.easing,
                r
              )
            : new Ps(t.duration, t.delay);
        }
      }
      class vp {
        constructor(t, n, r) {
          (this.namespaceId = t),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new Ps()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.parentPlayer = null),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((n, r) => {
              n.forEach((i) => Xh(t, r, void 0, i));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const n = this._player;
          n.triggerCallback && t.onStart(() => n.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, n) {
          Wt(this._queuedCallbacks, t, []).push(n);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const n = this._player;
          n.triggerCallback && n.triggerCallback(t);
        }
      }
      function wu(e) {
        return e && 1 === e.nodeType;
      }
      function Mb(e, t) {
        const n = e.style.display;
        return (e.style.display = t ?? "none"), n;
      }
      function Tb(e, t, n, r, i) {
        const o = [];
        n.forEach((l) => o.push(Mb(l)));
        const s = [];
        r.forEach((l, u) => {
          const c = new Map();
          l.forEach((d) => {
            const f = t.computeStyle(u, d, i);
            c.set(d, f), (!f || 0 == f.length) && ((u[rn] = Vj), s.push(u));
          }),
            e.set(u, c);
        });
        let a = 0;
        return n.forEach((l) => Mb(l, o[a++])), s;
      }
      function Ib(e, t) {
        const n = new Map();
        if ((e.forEach((a) => n.set(a, [])), 0 == t.length)) return n;
        const i = new Set(t),
          o = new Map();
        function s(a) {
          if (!a) return 1;
          let l = o.get(a);
          if (l) return l;
          const u = a.parentNode;
          return (l = n.has(u) ? u : i.has(u) ? 1 : s(u)), o.set(a, l), l;
        }
        return (
          t.forEach((a) => {
            const l = s(a);
            1 !== l && n.get(l).push(a);
          }),
          n
        );
      }
      function on(e, t) {
        e.classList?.add(t);
      }
      function lo(e, t) {
        e.classList?.remove(t);
      }
      function zj(e, t, n) {
        Ir(n).onDone(() => e.processLeaveNode(t));
      }
      function Ab(e, t) {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          r instanceof rb ? Ab(r.players, t) : t.push(r);
        }
      }
      function Rb(e, t, n) {
        const r = n.get(e);
        if (!r) return !1;
        let i = t.get(e);
        return i ? r.forEach((o) => i.add(o)) : t.set(e, r), n.delete(e), !0;
      }
      class Eu {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, o) => {}),
            (this._transitionEngine = new Uj(t, n, r)),
            (this._timelineEngine = new Oj(t, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, o) =>
              this.onRemovalComplete(i, o));
        }
        registerTrigger(t, n, r, i, o) {
          const s = t + "-" + i;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              c = lp(this._driver, o, l, []);
            if (l.length)
              throw (function x2(e, t) {
                return new v(3404, !1);
              })();
            (a = (function Ij(e, t, n) {
              return new Aj(e, t, n);
            })(i, c, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(n, i, a);
        }
        register(t, n) {
          this._transitionEngine.register(t, n);
        }
        destroy(t, n) {
          this._transitionEngine.destroy(t, n);
        }
        onInsert(t, n, r, i) {
          this._transitionEngine.insertNode(t, n, r, i);
        }
        onRemove(t, n, r) {
          this._transitionEngine.removeNode(t, n, r);
        }
        disableAnimations(t, n) {
          this._transitionEngine.markElementAsDisabled(t, n);
        }
        process(t, n, r, i) {
          if ("@" == r.charAt(0)) {
            const [o, s] = sb(r);
            this._timelineEngine.command(o, n, s, i);
          } else this._transitionEngine.trigger(t, n, r, i);
        }
        listen(t, n, r, i, o) {
          if ("@" == r.charAt(0)) {
            const [s, a] = sb(r);
            return this._timelineEngine.listen(s, n, a, o);
          }
          return this._transitionEngine.listen(t, n, r, i, o);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let Kj = (() => {
        class e {
          constructor(n, r, i) {
            (this._element = n),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0);
            let o = e.initialStylesByElement.get(n);
            o || e.initialStylesByElement.set(n, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Fn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Fn(this._element, this._initialStyles),
                this._endStyles &&
                  (Fn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (ni(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (ni(this._element, this._endStyles),
                  (this._endStyles = null)),
                Fn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (e.initialStylesByElement = new WeakMap()), e;
      })();
      function _p(e) {
        let t = null;
        return (
          e.forEach((n, r) => {
            (function Qj(e) {
              return "display" === e || "position" === e;
            })(r) && ((t = t || new Map()), t.set(r, n));
          }),
          t
        );
      }
      class Pb {
        constructor(t, n, r, i) {
          (this.element = t),
            (this.keyframes = n),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const n = [];
          return (
            t.forEach((r) => {
              n.push(Object.fromEntries(r));
            }),
            n
          );
        }
        _triggerWebAnimation(t, n, r) {
          return t.animate(this._convertKeyframesToObject(n), r);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((r, i) => {
              "offset" !== i &&
                t.set(i, this._finished ? r : mb(this.element, i));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const n = "start" === t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class Zj {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, n) {
          return !1;
        }
        containsElement(t, n) {
          return lb(t, n);
        }
        getParentElement(t) {
          return tp(t);
        }
        query(t, n, r) {
          return ub(t, n, r);
        }
        computeStyle(t, n, r) {
          return window.getComputedStyle(t)[n];
        }
        animate(t, n, r, i, o, s = []) {
          const l = {
            duration: r,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          o && (l.easing = o);
          const u = new Map(),
            c = s.filter((h) => h instanceof Pb);
          (function rj(e, t) {
            return 0 === e || 0 === t;
          })(r, i) &&
            c.forEach((h) => {
              h.currentSnapshot.forEach((p, g) => u.set(g, p));
            });
          let d = (function ej(e) {
            return e.length
              ? e[0] instanceof Map
                ? e
                : e.map((t) => hb(t))
              : [];
          })(n).map((h) => Ar(h));
          d = (function ij(e, t, n) {
            if (n.size && t.length) {
              let r = t[0],
                i = [];
              if (
                (n.forEach((o, s) => {
                  r.has(s) || i.push(s), r.set(s, o);
                }),
                i.length)
              )
                for (let o = 1; o < t.length; o++) {
                  let s = t[o];
                  i.forEach((a) => s.set(a, mb(e, a)));
                }
            }
            return t;
          })(t, d, u);
          const f = (function Wj(e, t) {
            let n = null,
              r = null;
            return (
              Array.isArray(t) && t.length
                ? ((n = _p(t[0])), t.length > 1 && (r = _p(t[t.length - 1])))
                : t instanceof Map && (n = _p(t)),
              n || r ? new Kj(e, n, r) : null
            );
          })(t, d);
          return new Pb(t, d, l, f);
        }
      }
      let Yj = (() => {
        class e extends XE {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: wt.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(n) ? eb(n) : n;
            return (
              Ob(this._renderer, null, r, "register", [i]),
              new Xj(r, this._renderer)
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(ns), w(Xe));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Xj extends d2 {
        constructor(t, n) {
          super(), (this._id = t), (this._renderer = n);
        }
        create(t, n) {
          return new Jj(this._id, t, n || {}, this._renderer);
        }
      }
      class Jj {
        constructor(t, n, r, i) {
          (this.id = t),
            (this.element = n),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(t, n) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, n);
        }
        _command(t, ...n) {
          return Ob(this._renderer, this.element, this.id, t, n);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function Ob(e, t, n, r, i) {
        return e.setProperty(t, `@@${n}:${r}`, i);
      }
      const Nb = "@.disabled";
      let eU = (() => {
        class e {
          constructor(n, r, i) {
            (this.delegate = n),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(n, r) {
            const o = this.delegate.createRenderer(n, r);
            if (!(n && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(o);
              return (
                c ||
                  ((c = new xb("", o, this.engine, () =>
                    this._rendererCache.delete(o)
                  )),
                  this._rendererCache.set(o, c)),
                c
              );
            }
            const s = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, n);
            const l = (c) => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(s, a, n, c.name, c);
            };
            return r.data.animation.forEach(l), new tU(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(n, r, i) {
            n >= 0 && n < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((o) => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, i]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(ns), w(Eu), w(me));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class xb {
        constructor(t, n, r, i) {
          (this.namespaceId = t),
            (this.delegate = n),
            (this.engine = r),
            (this._onDestroy = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (o) => n.destroyNode(o)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy(),
            this._onDestroy?.();
        }
        createElement(t, n) {
          return this.delegate.createElement(t, n);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, n) {
          this.delegate.appendChild(t, n),
            this.engine.onInsert(this.namespaceId, n, t, !1);
        }
        insertBefore(t, n, r, i = !0) {
          this.delegate.insertBefore(t, n, r),
            this.engine.onInsert(this.namespaceId, n, t, i);
        }
        removeChild(t, n, r) {
          this.engine.onRemove(this.namespaceId, n, this.delegate);
        }
        selectRootElement(t, n) {
          return this.delegate.selectRootElement(t, n);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, n, r, i) {
          this.delegate.setAttribute(t, n, r, i);
        }
        removeAttribute(t, n, r) {
          this.delegate.removeAttribute(t, n, r);
        }
        addClass(t, n) {
          this.delegate.addClass(t, n);
        }
        removeClass(t, n) {
          this.delegate.removeClass(t, n);
        }
        setStyle(t, n, r, i) {
          this.delegate.setStyle(t, n, r, i);
        }
        removeStyle(t, n, r) {
          this.delegate.removeStyle(t, n, r);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0) && n == Nb
            ? this.disableAnimations(t, !!r)
            : this.delegate.setProperty(t, n, r);
        }
        setValue(t, n) {
          this.delegate.setValue(t, n);
        }
        listen(t, n, r) {
          return this.delegate.listen(t, n, r);
        }
        disableAnimations(t, n) {
          this.engine.disableAnimations(t, n);
        }
      }
      class tU extends xb {
        constructor(t, n, r, i, o) {
          super(n, r, i, o), (this.factory = t), (this.namespaceId = n);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == Nb
              ? this.disableAnimations(t, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, t, n.slice(1), r)
            : this.delegate.setProperty(t, n, r);
        }
        listen(t, n, r) {
          if ("@" == n.charAt(0)) {
            const i = (function nU(e) {
              switch (e) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return e;
              }
            })(t);
            let o = n.slice(1),
              s = "";
            return (
              "@" != o.charAt(0) &&
                ([o, s] = (function rU(e) {
                  const t = e.indexOf(".");
                  return [e.substring(0, t), e.slice(t + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, i, o, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(t, n, r);
        }
      }
      const Fb = [
          { provide: XE, useClass: Yj },
          {
            provide: hp,
            useFactory: function oU() {
              return new bj();
            },
          },
          {
            provide: Eu,
            useClass: (() => {
              class e extends Eu {
                constructor(n, r, i, o) {
                  super(n.body, r, i);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(w(Xe), w(np), w(hp), w(or));
                }),
                (e.ɵprov = O({ token: e, factory: e.ɵfac })),
                e
              );
            })(),
          },
          {
            provide: ns,
            useFactory: function sU(e, t, n) {
              return new eU(e, t, n);
            },
            deps: [qh, Eu, me],
          },
        ],
        Dp = [
          { provide: np, useFactory: () => new Zj() },
          { provide: qv, useValue: "BrowserAnimations" },
          ...Fb,
        ],
        kb = [
          { provide: np, useClass: cb },
          { provide: qv, useValue: "NoopAnimations" },
          ...Fb,
        ];
      let aU = (() => {
        class e {
          static withConfig(n) {
            return { ngModule: e, providers: n.disableAnimations ? kb : Dp };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({ providers: Dp, imports: [GE] })),
          e
        );
      })();
      class lU extends Lt {
        constructor(t, n) {
          super();
        }
        schedule(t, n = 0) {
          return this;
        }
      }
      const Su = {
        setInterval(e, t, ...n) {
          const { delegate: r } = Su;
          return r?.setInterval
            ? r.setInterval(e, t, ...n)
            : setInterval(e, t, ...n);
        },
        clearInterval(e) {
          const { delegate: t } = Su;
          return (t?.clearInterval || clearInterval)(e);
        },
        delegate: void 0,
      };
      class uU extends lU {
        constructor(t, n) {
          super(t, n),
            (this.scheduler = t),
            (this.work = n),
            (this.pending = !1);
        }
        schedule(t, n = 0) {
          var r;
          if (this.closed) return this;
          this.state = t;
          const i = this.id,
            o = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(o, i, n)),
            (this.pending = !0),
            (this.delay = n),
            (this.id =
              null !== (r = this.id) && void 0 !== r
                ? r
                : this.requestAsyncId(o, this.id, n)),
            this
          );
        }
        requestAsyncId(t, n, r = 0) {
          return Su.setInterval(t.flush.bind(t, this), r);
        }
        recycleAsyncId(t, n, r = 0) {
          if (null != r && this.delay === r && !1 === this.pending) return n;
          null != n && Su.clearInterval(n);
        }
        execute(t, n) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const r = this._execute(t, n);
          if (r) return r;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, n) {
          let i,
            r = !1;
          try {
            this.work(t);
          } catch (o) {
            (r = !0),
              (i = o || new Error("Scheduled action threw falsy error"));
          }
          if (r) return this.unsubscribe(), i;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: t, scheduler: n } = this,
              { actions: r } = n;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              vi(r, this),
              null != t && (this.id = this.recycleAsyncId(n, t, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const Cp = { now: () => (Cp.delegate || Date).now(), delegate: void 0 };
      class ks {
        constructor(t, n = ks.now) {
          (this.schedulerActionCtor = t), (this.now = n);
        }
        schedule(t, n = 0, r) {
          return new this.schedulerActionCtor(this, t).schedule(r, n);
        }
      }
      ks.now = Cp.now;
      class dU extends ks {
        constructor(t, n = ks.now) {
          super(t, n), (this.actions = []), (this._active = !1);
        }
        flush(t) {
          const { actions: n } = this;
          if (this._active) return void n.push(t);
          let r;
          this._active = !0;
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = n.shift()));
          if (((this._active = !1), r)) {
            for (; (t = n.shift()); ) t.unsubscribe();
            throw r;
          }
        }
      }
      const hU = new (class fU extends dU {})(
        class cU extends uU {
          constructor(t, n) {
            super(t, n), (this.scheduler = t), (this.work = n);
          }
          schedule(t, n = 0) {
            return n > 0
              ? super.schedule(t, n)
              : ((this.delay = n),
                (this.state = t),
                this.scheduler.flush(this),
                this);
          }
          execute(t, n) {
            return n > 0 || this.closed
              ? super.execute(t, n)
              : this._execute(t, n);
          }
          requestAsyncId(t, n, r = 0) {
            return (null != r && r > 0) || (null == r && this.delay > 0)
              ? super.requestAsyncId(t, n, r)
              : (t.flush(this), 0);
          }
        }
      );
      function Lb(e, t) {
        return Me(
          (function gU(e, t, n, r, i) {
            return (o, s) => {
              let a = n,
                l = t,
                u = 0;
              o.subscribe(
                ve(
                  s,
                  (c) => {
                    const d = u++;
                    (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
                  },
                  i &&
                    (() => {
                      a && s.next(l), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      class _U extends Error {
        constructor(t, n) {
          super(
            (function DU(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function $b(e, t) {
        const n = !t?.manualCleanup;
        n &&
          !t?.injector &&
          (function h_(e) {
            if (
              !Mm() &&
              !(function xI() {
                return Di;
              })()
            )
              throw new v(-203, !1);
          })();
        const r = n ? t?.injector?.get(Ml) ?? M(Ml) : null;
        let i;
        i = (function Xm(e, t) {
          const n = new hA(e, t?.equal ?? Qm);
          return qc(n, n.signal.bind(n), {
            set: n.set.bind(n),
            update: n.update.bind(n),
            mutate: n.mutate.bind(n),
            asReadonly: n.asReadonly.bind(n),
          });
        })(t?.requireSync ? { kind: 0 } : { kind: 1, value: t?.initialValue });
        const o = e.subscribe({
          next: (s) => i.set({ kind: 1, value: s }),
          error: (s) => i.set({ kind: 2, error: s }),
        });
        return (
          r?.onDestroy(o.unsubscribe.bind(o)),
          Zm(() => {
            const s = i();
            switch (s.kind) {
              case 1:
                return s.value;
              case 2:
                throw s.error;
              case 0:
                throw new _U(
                  601,
                  "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously."
                );
            }
          })
        );
      }
      const Ls = {};
      function co(e, t) {
        if (((Ls[e] = (Ls[e] || 0) + 1), "function" == typeof t))
          return Mp(e, (...r) => ({ ...t(...r), type: e }));
        switch (t ? t._as : "empty") {
          case "empty":
            return Mp(e, () => ({ type: e }));
          case "props":
            return Mp(e, (r) => ({ ...r, type: e }));
          default:
            throw new Error("Unexpected config.");
        }
      }
      function Mp(e, t) {
        return Object.defineProperty(t, "type", { value: e, writable: !1 });
      }
      const zb = "@ngrx/store/init";
      let ii = (() => {
        class e extends rt {
          constructor() {
            super({ type: zb });
          }
          next(n) {
            if ("function" == typeof n)
              throw new TypeError(
                "\n        Dispatch expected an object, instead it received a function.\n        If you're using the createAction function, make sure to invoke the function\n        before dispatching the action. For example, someAction should be someAction()."
              );
            if (typeof n > "u") throw new TypeError("Actions must be objects");
            if (typeof n.type > "u")
              throw new TypeError("Actions must have a type property");
            super.next(n);
          }
          complete() {}
          ngOnDestroy() {
            super.complete();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const RU = [ii],
        Ip = new S("@ngrx/store Internal Root Guard"),
        Gb = new S("@ngrx/store Internal Initial State"),
        Ap = new S("@ngrx/store Initial State"),
        qb = new S("@ngrx/store Reducer Factory"),
        Wb = new S("@ngrx/store Internal Reducer Factory Provider"),
        Kb = new S("@ngrx/store Initial Reducers"),
        Rp = new S("@ngrx/store Internal Initial Reducers"),
        Qb = new S("@ngrx/store Store Features"),
        Zb = new S("@ngrx/store Internal Store Reducers"),
        Pp = new S("@ngrx/store Internal Feature Reducers"),
        Yb = new S("@ngrx/store Internal Feature Configs"),
        Op = new S("@ngrx/store Internal Store Features"),
        Xb = new S("@ngrx/store Internal Feature Reducers Token"),
        Np = new S("@ngrx/store Feature Reducers"),
        Jb = new S("@ngrx/store User Provided Meta Reducers"),
        Ru = new S("@ngrx/store Meta Reducers"),
        e0 = new S("@ngrx/store Internal Resolved Meta Reducers"),
        t0 = new S("@ngrx/store User Runtime Checks Config"),
        n0 = new S("@ngrx/store Internal User Runtime Checks Config"),
        Vs = new S("@ngrx/store Internal Runtime Checks"),
        js = new S("@ngrx/store Check if Action types are unique");
      function Fp(e, t = {}) {
        const n = Object.keys(e),
          r = {};
        for (let o = 0; o < n.length; o++) {
          const s = n[o];
          "function" == typeof e[s] && (r[s] = e[s]);
        }
        const i = Object.keys(r);
        return function (s, a) {
          s = void 0 === s ? t : s;
          let l = !1;
          const u = {};
          for (let c = 0; c < i.length; c++) {
            const d = i[c],
              h = s[d],
              p = (0, r[d])(h, a);
            (u[d] = p), (l = l || p !== h);
          }
          return l ? u : s;
        };
      }
      function o0(...e) {
        return function (t) {
          if (0 === e.length) return t;
          const n = e[e.length - 1];
          return e.slice(0, -1).reduceRight((i, o) => o(i), n(t));
        };
      }
      function s0(e, t) {
        return (
          Array.isArray(t) && t.length > 0 && (e = o0.apply(null, [...t, e])),
          (n, r) => {
            const i = e(n);
            return (o, s) => i((o = void 0 === o ? r : o), s);
          }
        );
      }
      new S("@ngrx/store Root Store Provider"),
        new S("@ngrx/store Feature State Provider");
      class Pu extends De {}
      class a0 extends ii {}
      let Us = (() => {
        class e extends rt {
          get currentReducers() {
            return this.reducers;
          }
          constructor(n, r, i, o) {
            super(o(i, r)),
              (this.dispatcher = n),
              (this.initialState = r),
              (this.reducers = i),
              (this.reducerFactory = o);
          }
          addFeature(n) {
            this.addFeatures([n]);
          }
          addFeatures(n) {
            const r = n.reduce(
              (
                i,
                {
                  reducers: o,
                  reducerFactory: s,
                  metaReducers: a,
                  initialState: l,
                  key: u,
                }
              ) => {
                const c =
                  "function" == typeof o
                    ? (function OU(e) {
                        const t =
                          Array.isArray(e) && e.length > 0
                            ? o0(...e)
                            : (n) => n;
                        return (n, r) => (
                          (n = t(n)), (i, o) => n((i = void 0 === i ? r : i), o)
                        );
                      })(a)(o, l)
                    : s0(s, a)(o, l);
                return (i[u] = c), i;
              },
              {}
            );
            this.addReducers(r);
          }
          removeFeature(n) {
            this.removeFeatures([n]);
          }
          removeFeatures(n) {
            this.removeReducers(n.map((r) => r.key));
          }
          addReducer(n, r) {
            this.addReducers({ [n]: r });
          }
          addReducers(n) {
            (this.reducers = { ...this.reducers, ...n }),
              this.updateReducers(Object.keys(n));
          }
          removeReducer(n) {
            this.removeReducers([n]);
          }
          removeReducers(n) {
            n.forEach((r) => {
              this.reducers = (function PU(e, t) {
                return Object.keys(e)
                  .filter((n) => n !== t)
                  .reduce((n, r) => Object.assign(n, { [r]: e[r] }), {});
              })(this.reducers, r);
            }),
              this.updateReducers(n);
          }
          updateReducers(n) {
            this.next(this.reducerFactory(this.reducers, this.initialState)),
              this.dispatcher.next({
                type: "@ngrx/store/update-reducers",
                features: n,
              });
          }
          ngOnDestroy() {
            this.complete();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(a0), w(Ap), w(Kb), w(qb));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const xU = [
        Us,
        { provide: Pu, useExisting: Us },
        { provide: a0, useExisting: ii },
      ];
      let Bs = (() => {
        class e extends ke {
          ngOnDestroy() {
            this.complete();
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = tt(e)))(r || e);
            };
          })()),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const FU = [Bs];
      class l0 extends De {}
      let u0 = (() => {
        class e extends rt {
          constructor(n, r, i, o) {
            super(o);
            const a = n.pipe(Rc(hU)).pipe(
                (function pU(...e) {
                  const t = Ac(e);
                  return Me((n, r) => {
                    const i = e.length,
                      o = new Array(i);
                    let s = e.map(() => !1),
                      a = !1;
                    for (let l = 0; l < i; l++)
                      ot(e[l]).subscribe(
                        ve(
                          r,
                          (u) => {
                            (o[l] = u),
                              !a &&
                                !s[l] &&
                                ((s[l] = !0), (a = s.every($n)) && (s = null));
                          },
                          _a
                        )
                      );
                    n.subscribe(
                      ve(r, (l) => {
                        if (a) {
                          const u = [l, ...o];
                          r.next(t ? t(...u) : u);
                        }
                      })
                    );
                  });
                })(r)
              ),
              u = a.pipe(Lb(kU, { state: o }));
            (this.stateSubscription = u.subscribe(({ state: c, action: d }) => {
              this.next(c), i.next(d);
            })),
              (this.state = $b(this, { manualCleanup: !0, requireSync: !0 }));
          }
          ngOnDestroy() {
            this.stateSubscription.unsubscribe(), this.complete();
          }
        }
        return (
          (e.INIT = zb),
          (e.ɵfac = function (n) {
            return new (n || e)(w(ii), w(Pu), w(Bs), w(Ap));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function kU(e = { state: void 0 }, [t, n]) {
        const { state: r } = e;
        return { state: n(r, t), action: t };
      }
      const LU = [u0, { provide: l0, useExisting: u0 }];
      let dr = (() => {
        class e extends De {
          constructor(n, r, i) {
            super(),
              (this.actionsObserver = r),
              (this.reducerManager = i),
              (this.source = n),
              (this.state = n.state);
          }
          select(n, ...r) {
            return kp.call(null, n, ...r)(this);
          }
          selectSignal(n, r) {
            return Zm(() => n(this.state()), {
              equal: r?.equal || ((i, o) => i === o),
            });
          }
          lift(n) {
            const r = new e(this, this.actionsObserver, this.reducerManager);
            return (r.operator = n), r;
          }
          dispatch(n) {
            this.actionsObserver.next(n);
          }
          next(n) {
            this.actionsObserver.next(n);
          }
          error(n) {
            this.actionsObserver.error(n);
          }
          complete() {
            this.actionsObserver.complete();
          }
          addReducer(n, r) {
            this.reducerManager.addReducer(n, r);
          }
          removeReducer(n) {
            this.reducerManager.removeReducer(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(l0), w(ii), w(Us));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const VU = [dr];
      function kp(e, t, ...n) {
        return function (i) {
          let o;
          if ("string" == typeof e) {
            const s = [t, ...n].filter(Boolean);
            o = i.pipe(
              (function mU(...e) {
                const t = e.length;
                if (0 === t)
                  throw new Error("list of properties cannot be empty.");
                return te((n) => {
                  let r = n;
                  for (let i = 0; i < t; i++) {
                    const o = r?.[e[i]];
                    if (!(typeof o < "u")) return;
                    r = o;
                  }
                  return r;
                });
              })(e, ...s)
            );
          } else {
            if ("function" != typeof e)
              throw new TypeError(
                `Unexpected type '${typeof e}' in select operator, expected 'string' or 'function'`
              );
            o = i.pipe(te((s) => e(s, t)));
          }
          return o.pipe(Cm());
        };
      }
      const Lp = "https://ngrx.io/guide/store/configuration/runtime-checks";
      function c0(e) {
        return void 0 === e;
      }
      function d0(e) {
        return null === e;
      }
      function f0(e) {
        return Array.isArray(e);
      }
      function h0(e) {
        return "object" == typeof e && null !== e;
      }
      function Vp(e) {
        return "function" == typeof e;
      }
      function jp(e, t) {
        return e === t;
      }
      function Up(e, t = jp, n = jp) {
        let o,
          r = null,
          i = null;
        return {
          memoized: function u() {
            if (void 0 !== o) return o.result;
            if (!r) return (i = e.apply(null, arguments)), (r = arguments), i;
            if (
              !(function qU(e, t, n) {
                for (let r = 0; r < e.length; r++)
                  if (!n(e[r], t[r])) return !0;
                return !1;
              })(arguments, r, t)
            )
              return i;
            const c = e.apply(null, arguments);
            return (r = arguments), n(i, c) ? i : ((i = c), c);
          },
          reset: function s() {
            (r = null), (i = null);
          },
          setResult: function a(c = void 0) {
            o = { result: c };
          },
          clearResult: function l() {
            o = void 0;
          },
        };
      }
      function Ou(...e) {
        return (function KU(e, t = { stateFn: WU }) {
          return function (...n) {
            let r = n;
            if (Array.isArray(r[0])) {
              const [c, ...d] = r;
              r = [...c, ...d];
            } else
              1 === r.length &&
                (function ZU(e) {
                  return (
                    !!e &&
                    "object" == typeof e &&
                    Object.values(e).every((t) => "function" == typeof t)
                  );
                })(r[0]) &&
                (r = (function YU(e) {
                  const t = Object.values(e),
                    n = Object.keys(e);
                  return [
                    ...t,
                    (...i) => n.reduce((o, s, a) => ({ ...o, [s]: i[a] }), {}),
                  ];
                })(r[0]));
            const i = r.slice(0, r.length - 1),
              o = r[r.length - 1],
              s = i.filter((c) => c.release && "function" == typeof c.release),
              a = e(function (...c) {
                return o.apply(null, c);
              }),
              l = Up(function (c, d) {
                return t.stateFn.apply(null, [c, i, d, a]);
              });
            return Object.assign(l.memoized, {
              release: function u() {
                l.reset(), a.reset(), s.forEach((c) => c.release());
              },
              projector: a.memoized,
              setResult: l.setResult,
              clearResult: l.clearResult,
            });
          };
        })(Up)(...e);
      }
      function WU(e, t, n, r) {
        if (void 0 === n) {
          const o = t.map((s) => s(e));
          return r.memoized.apply(null, o);
        }
        const i = t.map((o) => o(e, n));
        return r.memoized.apply(null, [...i, n]);
      }
      function eB(e) {
        return e instanceof S ? M(e) : e;
      }
      function tB(e, t) {
        return t.map((n, r) => {
          if (e[r] instanceof S) {
            const i = M(e[r]);
            return {
              key: n.key,
              reducerFactory: i.reducerFactory ? i.reducerFactory : Fp,
              metaReducers: i.metaReducers ? i.metaReducers : [],
              initialState: i.initialState,
            };
          }
          return n;
        });
      }
      function nB(e) {
        return e.map((t) => (t instanceof S ? M(t) : t));
      }
      function Bp(e) {
        return "function" == typeof e ? e() : e;
      }
      function rB(e, t) {
        return e.concat(t);
      }
      function iB() {
        if (M(dr, { optional: !0, skipSelf: !0 }))
          throw new TypeError(
            "The root Store has been provided more than once. Feature modules should provide feature states instead."
          );
        return "guarded";
      }
      function Hp(e) {
        Object.freeze(e);
        const t = Vp(e);
        return (
          Object.getOwnPropertyNames(e).forEach((n) => {
            if (
              !n.startsWith("\u0275") &&
              (function zU(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              })(e, n) &&
              (!t || ("caller" !== n && "callee" !== n && "arguments" !== n))
            ) {
              const r = e[n];
              (h0(r) || Vp(r)) && !Object.isFrozen(r) && Hp(r);
            }
          }),
          e
        );
      }
      function $p(e, t = []) {
        return (c0(e) || d0(e)) && 0 === t.length
          ? { path: ["root"], value: e }
          : Object.keys(e).reduce((r, i) => {
              if (r) return r;
              const o = e[i];
              return (function $U(e) {
                return Vp(e) && e.hasOwnProperty("\u0275cmp");
              })(o)
                ? r
                : !(
                    c0(o) ||
                    d0(o) ||
                    (function BU(e) {
                      return "number" == typeof e;
                    })(o) ||
                    (function UU(e) {
                      return "boolean" == typeof e;
                    })(o) ||
                    (function jU(e) {
                      return "string" == typeof e;
                    })(o) ||
                    f0(o)
                  ) &&
                    ((function p0(e) {
                      if (
                        !(function HU(e) {
                          return h0(e) && !f0(e);
                        })(e)
                      )
                        return !1;
                      const t = Object.getPrototypeOf(e);
                      return t === Object.prototype || null === t;
                    })(o)
                      ? $p(o, [...t, i])
                      : { path: [...t, i], value: o });
            }, !1);
      }
      function m0(e, t) {
        if (!1 === e) return;
        const n = e.path.join("."),
          r = new Error(
            `Detected unserializable ${t} at "${n}". ${Lp}#strict${t}serializability`
          );
        throw ((r.value = e.value), (r.unserializablePath = n), r);
      }
      function lB(e) {
        return {
          strictStateSerializability: !1,
          strictActionSerializability: !1,
          strictStateImmutability: !1,
          strictActionImmutability: !1,
          strictActionWithinNgZone: !1,
          strictActionTypeUniqueness: !1,
        };
      }
      function uB({
        strictActionSerializability: e,
        strictStateSerializability: t,
      }) {
        return (n) =>
          e || t
            ? (function sB(e, t) {
                return function (n, r) {
                  t.action(r) && m0($p(r), "action");
                  const i = e(n, r);
                  return t.state() && m0($p(i), "state"), i;
                };
              })(n, { action: (r) => e && !zp(r), state: () => t })
            : n;
      }
      function cB({ strictActionImmutability: e, strictStateImmutability: t }) {
        return (n) =>
          e || t
            ? (function oB(e, t) {
                return function (n, r) {
                  const i = t.action(r) ? Hp(r) : r,
                    o = e(n, i);
                  return t.state() ? Hp(o) : o;
                };
              })(n, { action: (r) => e && !zp(r), state: () => t })
            : n;
      }
      function zp(e) {
        return e.type.startsWith("@ngrx");
      }
      function dB({ strictActionWithinNgZone: e }) {
        return (t) =>
          e
            ? (function aB(e, t) {
                return function (n, r) {
                  if (t.action(r) && !me.isInAngularZone())
                    throw new Error(
                      `Action '${r.type}' running outside NgZone. ${Lp}#strictactionwithinngzone`
                    );
                  return e(n, r);
                };
              })(t, { action: (n) => e && !zp(n) })
            : t;
      }
      function fB(e) {
        return [
          { provide: n0, useValue: e },
          { provide: t0, useFactory: hB, deps: [n0] },
          { provide: Vs, deps: [t0], useFactory: lB },
          { provide: Ru, multi: !0, deps: [Vs], useFactory: cB },
          { provide: Ru, multi: !0, deps: [Vs], useFactory: uB },
          { provide: Ru, multi: !0, deps: [Vs], useFactory: dB },
        ];
      }
      function y0() {
        return [{ provide: js, multi: !0, deps: [Vs], useFactory: pB }];
      }
      function hB(e) {
        return e;
      }
      function pB(e) {
        if (!e.strictActionTypeUniqueness) return;
        const t = Object.entries(Ls)
          .filter(([, n]) => n > 1)
          .map(([n]) => n);
        if (t.length)
          throw new Error(
            `Action types are registered more than once, ${t
              .map((n) => `"${n}"`)
              .join(", ")}. ${Lp}#strictactiontypeuniqueness`
          );
      }
      function v0(e = {}, t = {}) {
        return [
          { provide: Ip, useFactory: iB },
          { provide: Gb, useValue: t.initialState },
          { provide: Ap, useFactory: Bp, deps: [Gb] },
          { provide: Rp, useValue: e },
          { provide: Zb, useExisting: e instanceof S ? e : Rp },
          { provide: Kb, deps: [Rp, [new pd(Zb)]], useFactory: eB },
          { provide: Jb, useValue: t.metaReducers ? t.metaReducers : [] },
          { provide: e0, deps: [Ru, Jb], useFactory: rB },
          { provide: Wb, useValue: t.reducerFactory ? t.reducerFactory : Fp },
          { provide: qb, deps: [Wb, e0], useFactory: s0 },
          RU,
          xU,
          FU,
          LU,
          VU,
          fB(t.runtimeChecks),
          y0(),
        ];
      }
      function _0(e, t, n = {}) {
        return [
          { provide: Yb, multi: !0, useValue: e instanceof Object ? {} : n },
          {
            provide: Qb,
            multi: !0,
            useValue: {
              key: e instanceof Object ? e.name : e,
              reducerFactory:
                n instanceof S || !n.reducerFactory ? Fp : n.reducerFactory,
              metaReducers:
                n instanceof S || !n.metaReducers ? [] : n.metaReducers,
              initialState:
                n instanceof S || !n.initialState ? void 0 : n.initialState,
            },
          },
          { provide: Op, deps: [Yb, Qb], useFactory: tB },
          {
            provide: Pp,
            multi: !0,
            useValue: e instanceof Object ? e.reducer : t,
          },
          { provide: Xb, multi: !0, useExisting: t instanceof S ? t : Pp },
          { provide: Np, multi: !0, deps: [Pp, [new pd(Xb)]], useFactory: nB },
          y0(),
        ];
      }
      let Nu = (() => {
          class e {
            constructor(n, r, i, o, s, a) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                w(ii),
                w(Pu),
                w(Bs),
                w(dr),
                w(Ip, 8),
                w(js, 8)
              );
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })(),
        Gp = (() => {
          class e {
            constructor(n, r, i, o, s) {
              (this.features = n),
                (this.featureReducers = r),
                (this.reducerManager = i);
              const a = n.map((l, u) => {
                const d = r.shift()[u];
                return { ...l, reducers: d, initialState: Bp(l.initialState) };
              });
              i.addFeatures(a);
            }
            ngOnDestroy() {
              this.reducerManager.removeFeatures(this.features);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(Op), w(Np), w(Us), w(Nu), w(js, 8));
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })(),
        _B = (() => {
          class e {
            static forRoot(n, r) {
              return { ngModule: Nu, providers: [...v0(n, r)] };
            }
            static forFeature(n, r, i = {}) {
              return { ngModule: Gp, providers: [..._0(n, r, i)] };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      function D0(...e) {
        return { reducer: e.pop(), types: e.map((r) => r.type) };
      }
      function C0(e, ...t) {
        const n = new Map();
        for (const r of t)
          for (const i of r.types) {
            const o = n.get(i);
            n.set(i, o ? (a, l) => r.reducer(o(a, l), l) : r.reducer);
          }
        return function (r = e, i) {
          const o = n.get(i.type);
          return o ? o(r, i) : r;
        };
      }
      function fo(e, t) {
        const n = he(e) ? e : () => e,
          r = (i) => i.error(n());
        return new De(t ? (i) => t.schedule(r, 0, i) : r);
      }
      class fr {
        constructor(t, n, r) {
          (this.kind = t),
            (this.value = n),
            (this.error = r),
            (this.hasValue = "N" === t);
        }
        observe(t) {
          return w0(this, t);
        }
        do(t, n, r) {
          const { kind: i, value: o, error: s } = this;
          return "N" === i ? t?.(o) : "E" === i ? n?.(s) : r?.();
        }
        accept(t, n, r) {
          var i;
          return he(null === (i = t) || void 0 === i ? void 0 : i.next)
            ? this.observe(t)
            : this.do(t, n, r);
        }
        toObservable() {
          const { kind: t, value: n, error: r } = this,
            i = "N" === t ? H(n) : "E" === t ? fo(() => r) : "C" === t ? an : 0;
          if (!i) throw new TypeError(`Unexpected notification kind ${t}`);
          return i;
        }
        static createNext(t) {
          return new fr("N", t);
        }
        static createError(t) {
          return new fr("E", void 0, t);
        }
        static createComplete() {
          return fr.completeNotification;
        }
      }
      function w0(e, t) {
        var n, r, i;
        const { kind: o, value: s, error: a } = e;
        if ("string" != typeof o)
          throw new TypeError('Invalid notification, missing "kind"');
        "N" === o
          ? null === (n = t.next) || void 0 === n || n.call(t, s)
          : "E" === o
          ? null === (r = t.error) || void 0 === r || r.call(t, a)
          : null === (i = t.complete) || void 0 === i || i.call(t);
      }
      function Rr(e) {
        return Me((t, n) => {
          let o,
            r = null,
            i = !1;
          (r = t.subscribe(
            ve(n, void 0, void 0, (s) => {
              (o = ot(e(s, Rr(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      function kt(e, t) {
        return Me((n, r) => {
          let i = 0;
          n.subscribe(ve(r, (o) => e.call(t, o, i++) && r.next(o)));
        });
      }
      function E0(e, t, n, r) {
        return Me((i, o) => {
          let s;
          t && "function" != typeof t
            ? ({ duration: n, element: s, connector: r } = t)
            : (s = t);
          const a = new Map(),
            l = (p) => {
              a.forEach(p), p(o);
            },
            u = (p) => l((g) => g.error(p));
          let c = 0,
            d = !1;
          const f = new rm(
            o,
            (p) => {
              try {
                const g = e(p);
                let m = a.get(g);
                if (!m) {
                  a.set(g, (m = r ? r() : new ke()));
                  const C = (function h(p, g) {
                    const m = new De((C) => {
                      c++;
                      const y = g.subscribe(C);
                      return () => {
                        y.unsubscribe(), 0 == --c && d && f.unsubscribe();
                      };
                    });
                    return (m.key = p), m;
                  })(g, m);
                  if ((o.next(C), n)) {
                    const y = ve(
                      m,
                      () => {
                        m.complete(), y?.unsubscribe();
                      },
                      void 0,
                      void 0,
                      () => a.delete(g)
                    );
                    f.add(ot(n(C)).subscribe(y));
                  }
                }
                m.next(s ? s(p) : p);
              } catch (g) {
                u(g);
              }
            },
            () => l((p) => p.complete()),
            u,
            () => a.clear(),
            () => ((d = !0), 0 === c)
          );
          i.subscribe(f);
        });
      }
      function b0(e, t) {
        return t
          ? (n) =>
              n.pipe(
                b0((r, i) => ot(e(r, i)).pipe(te((o, s) => t(r, o, i, s))))
              )
          : Me((n, r) => {
              let i = 0,
                o = null,
                s = !1;
              n.subscribe(
                ve(
                  r,
                  (a) => {
                    o ||
                      ((o = ve(r, void 0, () => {
                        (o = null), s && r.complete();
                      })),
                      ot(e(a, i++)).subscribe(o));
                  },
                  () => {
                    (s = !0), !o && r.complete();
                  }
                )
              );
            });
      }
      function hr(e) {
        return e <= 0
          ? () => an
          : Me((t, n) => {
              let r = 0;
              t.subscribe(
                ve(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete());
                })
              );
            });
      }
      fr.completeNotification = new fr("C");
      const EB = { dispatch: !0, functional: !1, useEffectsErrorHandler: !0 },
        xu = "__@ngrx/effects_create__";
      function S0(e, t = {}) {
        const n = t.functional ? e : e(),
          r = { ...EB, ...t };
        return Object.defineProperty(n, xu, { value: r }), n;
      }
      function T0(e) {
        return Object.getPrototypeOf(e);
      }
      function qp(e) {
        return "function" == typeof e;
      }
      function Wp(e) {
        return e.filter(qp);
      }
      function TB(e, t, n) {
        const r = T0(e).constructor.name,
          i = (function M0(e) {
            return (function bB(e) {
              return Object.getOwnPropertyNames(e)
                .filter(
                  (r) =>
                    !(!e[r] || !e[r].hasOwnProperty(xu)) &&
                    e[r][xu].hasOwnProperty("dispatch")
                )
                .map((r) => ({ propertyName: r, ...e[r][xu] }));
            })(e);
          })(e).map(
            ({ propertyName: o, dispatch: s, useEffectsErrorHandler: a }) => {
              const l = "function" == typeof e[o] ? e[o]() : e[o],
                u = a ? n(l, t) : l;
              return !1 === s
                ? u.pipe(
                    (function DB() {
                      return Me((e, t) => {
                        e.subscribe(ve(t, _a));
                      });
                    })()
                  )
                : u
                    .pipe(
                      (function CB() {
                        return Me((e, t) => {
                          e.subscribe(
                            ve(
                              t,
                              (n) => {
                                t.next(fr.createNext(n));
                              },
                              () => {
                                t.next(fr.createComplete()), t.complete();
                              },
                              (n) => {
                                t.next(fr.createError(n)), t.complete();
                              }
                            )
                          );
                        });
                      })()
                    )
                    .pipe(
                      te((d) => ({
                        effect: e[o],
                        notification: d,
                        propertyName: o,
                        sourceName: r,
                        sourceInstance: e,
                      }))
                    );
            }
          );
        return Pc(...i);
      }
      function I0(e, t, n = 10) {
        return e.pipe(
          Rr((r) => (t && t.handleError(r), n <= 1 ? e : I0(e, t, n - 1)))
        );
      }
      let AB = (() => {
        class e extends De {
          constructor(n) {
            super(), n && (this.source = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Bs));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function A0(...e) {
        return kt((t) =>
          e.some((n) =>
            "string" == typeof n ? n === t.type : n.type === t.type
          )
        );
      }
      const R0 = new S("@ngrx/effects Internal Root Guard"),
        Fu = new S("@ngrx/effects User Provided Effects"),
        Kp = new S("@ngrx/effects Internal Root Effects"),
        P0 = new S("@ngrx/effects Internal Root Effects Instances"),
        O0 = new S("@ngrx/effects Internal Feature Effects"),
        N0 = new S("@ngrx/effects Internal Feature Effects Instance Groups"),
        RB = new S("@ngrx/effects Effects Error Handler", {
          providedIn: "root",
          factory: () => I0,
        }),
        x0 = "@ngrx/effects/init";
      co(x0);
      function HB(e) {
        return Qp(e, "ngrxOnInitEffects");
      }
      function Qp(e, t) {
        return e && t in e && "function" == typeof e[t];
      }
      let Zp = (() => {
        class e extends ke {
          constructor(n, r) {
            super(), (this.errorHandler = n), (this.effectsErrorHandler = r);
          }
          addEffects(n) {
            this.next(n);
          }
          toActions() {
            return this.pipe(
              E0((n) =>
                (function SB(e) {
                  return (
                    "Object" !== e.constructor.name &&
                    "Function" !== e.constructor.name
                  );
                })(n)
                  ? T0(n)
                  : n
              ),
              qe((n) => n.pipe(E0($B))),
              qe((n) => {
                const r = n.pipe(
                  b0((o) =>
                    (function zB(e, t) {
                      return (n) => {
                        const r = TB(n, e, t);
                        return (function UB(e) {
                          return Qp(e, "ngrxOnRunEffects");
                        })(n)
                          ? n.ngrxOnRunEffects(r)
                          : r;
                      };
                    })(
                      this.errorHandler,
                      this.effectsErrorHandler
                    )(o)
                  ),
                  te(
                    (o) => (
                      (function OB(e, t) {
                        if ("N" === e.notification.kind) {
                          const n = e.notification.value;
                          !(function NB(e) {
                            return (
                              "function" != typeof e &&
                              e &&
                              e.type &&
                              "string" == typeof e.type
                            );
                          })(n) &&
                            t.handleError(
                              new Error(
                                `Effect ${(function xB({
                                  propertyName: e,
                                  sourceInstance: t,
                                  sourceName: n,
                                }) {
                                  const r = "function" == typeof t[e];
                                  return `"${n}.${String(e)}${r ? "()" : ""}"`;
                                })(
                                  e
                                )} dispatched an invalid action: ${(function kB(
                                  e
                                ) {
                                  try {
                                    return JSON.stringify(e);
                                  } catch {
                                    return e;
                                  }
                                })(n)}`
                              )
                            );
                        }
                      })(o, this.errorHandler),
                      o.notification
                    )
                  ),
                  kt((o) => "N" === o.kind && null != o.value),
                  (function wB() {
                    return Me((e, t) => {
                      e.subscribe(ve(t, (n) => w0(n, t)));
                    });
                  })()
                );
                return Pc(
                  r,
                  n.pipe(
                    hr(1),
                    kt(HB),
                    te((o) => o.ngrxOnInitEffects())
                  )
                );
              })
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Er), w(RB));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function $B(e) {
        return (function VB(e) {
          return Qp(e, "ngrxOnIdentifyEffects");
        })(e)
          ? e.ngrxOnIdentifyEffects()
          : "";
      }
      let Yp = (() => {
          class e {
            get isStarted() {
              return !!this.effectsSubscription;
            }
            constructor(n, r) {
              (this.effectSources = n),
                (this.store = r),
                (this.effectsSubscription = null);
            }
            start() {
              this.effectsSubscription ||
                (this.effectsSubscription = this.effectSources
                  .toActions()
                  .subscribe(this.store));
            }
            ngOnDestroy() {
              this.effectsSubscription &&
                (this.effectsSubscription.unsubscribe(),
                (this.effectsSubscription = null));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(Zp), w(dr));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        F0 = (() => {
          class e {
            constructor(n, r, i, o, s, a, l) {
              (this.sources = n), r.start();
              for (const u of o) n.addEffects(u);
              i.dispatch({ type: x0 });
            }
            addEffects(n) {
              this.sources.addEffects(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                w(Zp),
                w(Yp),
                w(dr),
                w(P0),
                w(Nu, 8),
                w(Gp, 8),
                w(R0, 8)
              );
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })(),
        GB = (() => {
          class e {
            constructor(n, r, i, o) {
              const s = r.flat();
              for (const a of s) n.addEffects(a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(F0), w(N0), w(Nu, 8), w(Gp, 8));
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })(),
        qB = (() => {
          class e {
            static forFeature(...n) {
              const r = n.flat(),
                i = Wp(r);
              return {
                ngModule: GB,
                providers: [
                  i,
                  { provide: O0, multi: !0, useValue: r },
                  { provide: Fu, multi: !0, useValue: [] },
                  { provide: N0, multi: !0, useFactory: k0, deps: [O0, Fu] },
                ],
              };
            }
            static forRoot(...n) {
              const r = n.flat(),
                i = Wp(r);
              return {
                ngModule: F0,
                providers: [
                  i,
                  { provide: Kp, useValue: [r] },
                  { provide: R0, useFactory: WB },
                  { provide: Fu, multi: !0, useValue: [] },
                  { provide: P0, useFactory: k0, deps: [Kp, Fu] },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      function k0(e, t) {
        const n = [];
        for (const r of e) n.push(...r);
        for (const r of t) n.push(...r);
        return n.map((r) =>
          (function MB(e) {
            return e instanceof S || qp(e);
          })(r)
            ? M(r)
            : r
        );
      }
      function WB() {
        const e = M(Yp, { optional: !0, skipSelf: !0 }),
          t = M(Kp, { self: !0 });
        if ((1 !== t.length || 0 !== t[0].length) && e)
          throw new TypeError(
            "EffectsModule.forRoot() called twice. Feature modules should use EffectsModule.forFeature() instead."
          );
        return "guarded";
      }
      function L0(e) {
        return !!e && (e instanceof De || (he(e.lift) && he(e.subscribe)));
      }
      const { isArray: KB } = Array,
        { getPrototypeOf: QB, prototype: ZB, keys: YB } = Object;
      function V0(e) {
        if (1 === e.length) {
          const t = e[0];
          if (KB(t)) return { args: t, keys: null };
          if (
            (function XB(e) {
              return e && "object" == typeof e && QB(e) === ZB;
            })(t)
          ) {
            const n = YB(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: JB } = Array;
      function j0(e) {
        return te((t) =>
          (function eH(e, t) {
            return JB(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function U0(e, t) {
        return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
      }
      function Xp(...e) {
        const t = Io(e),
          n = Ac(e),
          { args: r, keys: i } = V0(e);
        if (0 === r.length) return We([], t);
        const o = new De(
          (function tH(e, t, n = $n) {
            return (r) => {
              B0(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let l = 0; l < i; l++)
                    B0(
                      t,
                      () => {
                        const u = We(e[l], t);
                        let c = !1;
                        u.subscribe(
                          ve(
                            r,
                            (d) => {
                              (o[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(o.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, i ? (s) => U0(i, s) : $n)
        );
        return n ? o.pipe(j0(n)) : o;
      }
      function B0(e, t, n) {
        e ? zn(n, e, t) : t();
      }
      const ku = Mo(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Jp(...e) {
        return (function nH() {
          return _i(1);
        })()(We(e, Io(e)));
      }
      function H0(e) {
        return new De((t) => {
          ot(e()).subscribe(t);
        });
      }
      function eg() {
        return Me((e, t) => {
          let n = null;
          e._refCount++;
          const r = ve(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const i = e._connection,
              o = n;
            (n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class $0 extends De {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            nm(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Lt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                ve(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Lt.EMPTY));
          }
          return t;
        }
        refCount() {
          return eg()(this);
        }
      }
      function Lu(e) {
        return Me((t, n) => {
          let r = !1;
          t.subscribe(
            ve(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function z0(e = iH) {
        return Me((t, n) => {
          let r = !1;
          t.subscribe(
            ve(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function iH() {
        return new ku();
      }
      function oi(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? kt((i, o) => e(i, o, r)) : $n,
            hr(1),
            n ? Lu(t) : z0(() => new ku())
          );
      }
      function ho(e, t) {
        return he(t) ? qe(e, t, 1) : qe(e, 1);
      }
      function vt(e, t, n) {
        const r = he(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Me((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                ve(
                  o,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      o.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      o.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : $n;
      }
      function tg(e) {
        return e <= 0
          ? () => an
          : Me((t, n) => {
              let r = [];
              t.subscribe(
                ve(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Hs(e) {
        return Me((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const J = "primary",
        $s = Symbol("RouteTitle");
      class aH {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function po(e) {
        return new aH(e);
      }
      function lH(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function Ln(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !G0(e[i], t[i]))) return !1;
        return !0;
      }
      function G0(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, o) => r[o] === i);
        }
        return e === t;
      }
      function q0(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Pr(e) {
        return L0(e) ? e : gs(e) ? We(Promise.resolve(e)) : H(e);
      }
      const cH = {
          exact: function Q0(e, t, n) {
            if (
              !si(e.segments, t.segments) ||
              !Vu(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Q0(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Z0,
        },
        W0 = {
          exact: function dH(e, t) {
            return Ln(e, t);
          },
          subset: function fH(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => G0(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function K0(e, t, n) {
        return (
          cH[n.paths](e.root, t.root, n.matrixParams) &&
          W0[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Z0(e, t, n) {
        return Y0(e, t, t.segments, n);
      }
      function Y0(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!si(i, n) || t.hasChildren() || !Vu(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!si(e.segments, n) || !Vu(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !Z0(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length);
          return (
            !!(si(e.segments, i) && Vu(e.segments, i, r) && e.children[J]) &&
            Y0(e.children[J], t, o, r)
          );
        }
      }
      function Vu(e, t, n) {
        return t.every((r, i) => W0[n](e[i].parameters, r.parameters));
      }
      class go {
        constructor(t = new ye([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = po(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return gH.serialize(this);
        }
      }
      class ye {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return ju(this);
        }
      }
      class zs {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = po(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return eS(this);
        }
      }
      function si(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Gs = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({
            token: e,
            factory: function () {
              return new ng();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class ng {
        parse(t) {
          const n = new MH(t);
          return new go(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${qs(t.root, !0)}`,
            r = (function vH(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Uu(n)}=${Uu(i)}`).join("&")
                    : `${Uu(n)}=${Uu(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function mH(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const gH = new ng();
      function ju(e) {
        return e.segments.map((t) => eS(t)).join("/");
      }
      function qs(e, t) {
        if (!e.hasChildren()) return ju(e);
        if (t) {
          const n = e.children[J] ? qs(e.children[J], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([i, o]) => {
              i !== J && r.push(`${i}:${qs(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function pH(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, i]) => {
                r === J && (n = n.concat(t(i, r)));
              }),
              Object.entries(e.children).forEach(([r, i]) => {
                r !== J && (n = n.concat(t(i, r)));
              }),
              n
            );
          })(e, (r, i) =>
            i === J ? [qs(e.children[J], !1)] : [`${i}:${qs(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[J]
            ? `${ju(e)}/${n[0]}`
            : `${ju(e)}/(${n.join("//")})`;
        }
      }
      function X0(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Uu(e) {
        return X0(e).replace(/%3B/gi, ";");
      }
      function rg(e) {
        return X0(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Bu(e) {
        return decodeURIComponent(e);
      }
      function J0(e) {
        return Bu(e.replace(/\+/g, "%20"));
      }
      function eS(e) {
        return `${rg(e.path)}${(function yH(e) {
          return Object.keys(e)
            .map((t) => `;${rg(t)}=${rg(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const _H = /^[^\/()?;#]+/;
      function ig(e) {
        const t = e.match(_H);
        return t ? t[0] : "";
      }
      const DH = /^[^\/()?;=#]+/,
        wH = /^[^=?&#]+/,
        bH = /^[^&#]+/;
      class MH {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new ye([], {})
              : new ye([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) &&
              (r[J] = new ye(t, n)),
            r
          );
        }
        parseSegment() {
          const t = ig(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new v(4009, !1);
          return this.capture(t), new zs(Bu(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function CH(e) {
            const t = e.match(DH);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = ig(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[Bu(n)] = Bu(r);
        }
        parseQueryParam(t) {
          const n = (function EH(e) {
            const t = e.match(wH);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function SH(e) {
              const t = e.match(bH);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = J0(n),
            o = J0(r);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ig(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new v(4010, !1);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.slice(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = J);
            const s = this.parseChildren();
            (n[o] = 1 === Object.keys(s).length ? s[J] : new ye([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new v(4011, !1);
        }
      }
      function tS(e) {
        return e.segments.length > 0 ? new ye([], { [J]: e }) : e;
      }
      function nS(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const o = nS(e.children[r]);
          if (r === J && 0 === o.segments.length && o.hasChildren())
            for (const [s, a] of Object.entries(o.children)) t[s] = a;
          else (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
        }
        return (function TH(e) {
          if (1 === e.numberOfChildren && e.children[J]) {
            const t = e.children[J];
            return new ye(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new ye(e.segments, t));
      }
      function ai(e) {
        return e instanceof go;
      }
      function rS(e) {
        let t;
        const i = tS(
          (function n(o) {
            const s = {};
            for (const l of o.children) {
              const u = n(l);
              s[l.outlet] = u;
            }
            const a = new ye(o.url, s);
            return o === e && (t = a), a;
          })(e.root)
        );
        return t ?? i;
      }
      function iS(e, t, n, r) {
        let i = e;
        for (; i.parent; ) i = i.parent;
        if (0 === t.length) return og(i, i, i, n, r);
        const o = (function AH(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new sS(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((i, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  Object.entries(o.outlets).forEach(([l, u]) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...i, o.segmentPath];
            }
            return "string" != typeof o
              ? [...i, o]
              : 0 === s
              ? (o.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && i.push(a));
                }),
                i)
              : [...i, o];
          }, []);
          return new sS(n, t, r);
        })(t);
        if (o.toRoot()) return og(i, i, new ye([], {}), n, r);
        const s = (function RH(e, t, n) {
            if (e.isAbsolute) return new $u(t, !0, 0);
            if (!n) return new $u(t, !1, NaN);
            if (null === n.parent) return new $u(n, !0, 0);
            const r = Hu(e.commands[0]) ? 0 : 1;
            return (function PH(e, t, n) {
              let r = e,
                i = t,
                o = n;
              for (; o > i; ) {
                if (((o -= i), (r = r.parent), !r)) throw new v(4005, !1);
                i = r.segments.length;
              }
              return new $u(r, !1, i - o);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(o, i, e),
          a = s.processChildren
            ? Ks(s.segmentGroup, s.index, o.commands)
            : aS(s.segmentGroup, s.index, o.commands);
        return og(i, s.segmentGroup, a, n, r);
      }
      function Hu(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Ws(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function og(e, t, n, r, i) {
        let s,
          o = {};
        r &&
          Object.entries(r).forEach(([l, u]) => {
            o[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : oS(e, t, n));
        const a = tS(nS(s));
        return new go(a, o, i);
      }
      function oS(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([i, o]) => {
            r[i] = o === t ? n : oS(o, t, n);
          }),
          new ye(e.segments, r)
        );
      }
      class sS {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Hu(r[0]))
          )
            throw new v(4003, !1);
          const i = r.find(Ws);
          if (i && i !== q0(r)) throw new v(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class $u {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function aS(e, t, n) {
        if (
          (e || (e = new ye([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return Ks(e, t, n);
        const r = (function NH(e, t, n) {
            let r = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o;
              const s = e.segments[i],
                a = n[r];
              if (Ws(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!uS(l, u, s)) return o;
                r += 2;
              } else {
                if (!uS(l, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new ye(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[J] = new ye(e.segments.slice(r.pathIndex), e.children)),
            Ks(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new ye(e.segments, {})
          : r.match && !e.hasChildren()
          ? sg(e, t, n)
          : r.match
          ? Ks(e, 0, i)
          : sg(e, t, n);
      }
      function Ks(e, t, n) {
        if (0 === n.length) return new ye(e.segments, {});
        {
          const r = (function OH(e) {
              return Ws(e[0]) ? e[0].outlets : { [J]: e };
            })(n),
            i = {};
          if (
            !r[J] &&
            e.children[J] &&
            1 === e.numberOfChildren &&
            0 === e.children[J].segments.length
          ) {
            const o = Ks(e.children[J], t, n);
            return new ye(e.segments, o.children);
          }
          return (
            Object.entries(r).forEach(([o, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = aS(e.children[o], t, s));
            }),
            Object.entries(e.children).forEach(([o, s]) => {
              void 0 === r[o] && (i[o] = s);
            }),
            new ye(e.segments, i)
          );
        }
      }
      function sg(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (Ws(o)) {
            const l = xH(o.outlets);
            return new ye(r, l);
          }
          if (0 === i && Hu(n[0])) {
            r.push(new zs(e.segments[t].path, lS(n[0]))), i++;
            continue;
          }
          const s = Ws(o) ? o.outlets[J] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          s && a && Hu(a)
            ? (r.push(new zs(s, lS(a))), (i += 2))
            : (r.push(new zs(s, {})), i++);
        }
        return new ye(r, {});
      }
      function xH(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = sg(new ye([], {}), 0, r));
          }),
          t
        );
      }
      function lS(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function uS(e, t, n) {
        return e == n.path && Ln(t, n.parameters);
      }
      const Qs = "imperative";
      class Vn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class ag extends Vn {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class li extends Vn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class zu extends Vn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Zs extends Vn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 16);
        }
      }
      class lg extends Vn {
        constructor(t, n, r, i) {
          super(t, n), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class FH extends Vn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class kH extends Vn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class LH extends Vn {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class VH extends Vn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class jH extends Vn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class UH {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class BH {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class HH {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class $H {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zH {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class GH {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class cS {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class qH {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Ys()),
            (this.attachRef = null);
        }
      }
      let Ys = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const i = this.getOrCreateContext(n);
            (i.outlet = r), this.contexts.set(n, i);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new qH()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class dS {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = ug(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = ug(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = cg(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return cg(t, this._root).map((n) => n.value);
        }
      }
      function ug(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = ug(e, n);
          if (r) return r;
        }
        return null;
      }
      function cg(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = cg(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class pr {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function mo(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class fS extends dS {
        constructor(t, n) {
          super(t), (this.snapshot = n), dg(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function hS(e, t) {
        const n = (function WH(e, t) {
            const s = new Gu([], {}, {}, "", {}, J, t, null, {});
            return new gS("", new pr(s, []));
          })(0, t),
          r = new rt([new zs("", {})]),
          i = new rt({}),
          o = new rt({}),
          s = new rt({}),
          a = new rt(""),
          l = new Or(r, i, s, a, o, J, t, n.root);
        return (l.snapshot = n.root), new fS(new pr(l, []), n);
      }
      class Or {
        constructor(t, n, r, i, o, s, a, l) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = i),
            (this.dataSubject = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = l),
            (this.title =
              this.dataSubject?.pipe(te((u) => u[$s])) ?? H(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(te((t) => po(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(te((t) => po(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function pS(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function KH(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Gu {
        get title() {
          return this.data?.[$s];
        }
        constructor(t, n, r, i, o, s, a, l, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = po(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = po(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class gS extends dS {
        constructor(t, n) {
          super(n), (this.url = t), dg(this, n);
        }
        toString() {
          return mS(this._root);
        }
      }
      function dg(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => dg(e, n));
      }
      function mS(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(mS).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function fg(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ln(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            Ln(t.params, n.params) || e.paramsSubject.next(n.params),
            (function uH(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ln(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Ln(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function hg(e, t) {
        const n =
          Ln(e.params, t.params) &&
          (function hH(e, t) {
            return (
              si(e, t) && e.every((n, r) => Ln(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || hg(e.parent, t.parent))
        );
      }
      let pg = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = J),
              (this.activateEvents = new Se()),
              (this.deactivateEvents = new Se()),
              (this.attachEvents = new Se()),
              (this.detachEvents = new Se()),
              (this.parentContexts = M(Ys)),
              (this.location = M(pn)),
              (this.changeDetector = M(Kl)),
              (this.environmentInjector = M(Rn)),
              (this.inputBinder = M(qu, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: i } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(i) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(i)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new v(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new v(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new v(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new v(4013, !1);
            this._activatedRoute = n;
            const i = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new QH(n, a, i.injector);
            (this.activated = i.createComponent(s, {
              index: i.length,
              injector: l,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = G({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Xt],
          })),
          e
        );
      })();
      class QH {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Or
            ? this.route
            : t === Ys
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const qu = new S("");
      let yS = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: r } = n,
              i = Xp([r.queryParams, r.params, r.data])
                .pipe(
                  Vt(
                    ([o, s, a], l) => (
                      (a = { ...o, ...s, ...a }),
                      0 === l ? H(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((o) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const s = (function qk(e) {
                    const t = ae(e);
                    if (!t) return null;
                    const n = new ls(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(r.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      n.activatedComponentRef.setInput(a, o[a]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Xs(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function YH(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Xs(e, r, i);
              return Xs(e, r);
            });
          })(e, t, n);
          return new pr(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Xs(e, a))),
                s
              );
            }
          }
          const r = (function XH(e) {
              return new Or(
                new rt(e.url),
                new rt(e.params),
                new rt(e.queryParams),
                new rt(e.fragment),
                new rt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => Xs(e, o));
          return new pr(r, i);
        }
      }
      const gg = "ngNavigationCancelingError";
      function vS(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = ai(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = _S(!1, 0, t);
        return (i.url = n), (i.navigationBehaviorOptions = r), i;
      }
      function _S(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[gg] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function DS(e) {
        return CS(e) && ai(e.url);
      }
      function CS(e) {
        return e && e[gg];
      }
      let wS = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Hl],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && de(0, "router-outlet");
            },
            dependencies: [pg],
            encapsulation: 2,
          })),
          e
        );
      })();
      function mg(e) {
        const t = e.children && e.children.map(mg),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== J &&
            (n.component = wS),
          n
        );
      }
      function vn(e) {
        return e.outlet || J;
      }
      function Js(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class o$ {
        constructor(t, n, r, i, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i),
            (this.inputBindingEnabled = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            fg(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = mo(n);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            Object.values(i).forEach((o) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else o && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = mo(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = mo(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = mo(n);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new GH(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new $H(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if ((fg(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                fg(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Js(i.snapshot);
              (s.attachRef = null),
                (s.route = i),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(i, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class ES {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Wu {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function s$(e, t, n) {
        const r = e._root;
        return ea(r, t ? t._root : null, n, [r.value]);
      }
      function yo(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function II(e) {
              return null !== Sa(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function ea(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = mo(t);
        return (
          e.children.forEach((s) => {
            (function l$(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function u$(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !si(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !si(e.url, t.url) || !Ln(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !hg(e, t) || !Ln(e.queryParams, t.queryParams);
                    default:
                      return !hg(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new ES(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  ea(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new Wu(a.outlet.component, s));
              } else
                s && ta(t, a, i),
                  i.canActivateChecks.push(new ES(r)),
                  ea(e, null, o.component ? (a ? a.children : null) : n, r, i);
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          Object.entries(o).forEach(([s, a]) => ta(a, n.getContext(s), i)),
          i
        );
      }
      function ta(e, t, n) {
        const r = mo(e),
          i = e.value;
        Object.entries(r).forEach(([o, s]) => {
          ta(s, i.component ? (t ? t.children.getContext(o) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Wu(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function na(e) {
        return "function" == typeof e;
      }
      function bS(e) {
        return e instanceof ku || "EmptyError" === e?.name;
      }
      const Ku = Symbol("INITIAL_VALUE");
      function vo() {
        return Vt((e) =>
          Xp(
            e.map((t) =>
              t.pipe(
                hr(1),
                (function rH(...e) {
                  const t = Io(e);
                  return Me((n, r) => {
                    (t ? Jp(e, n, t) : Jp(e, n)).subscribe(r);
                  });
                })(Ku)
              )
            )
          ).pipe(
            te((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Ku) return Ku;
                  if (!1 === n || n instanceof go) return n;
                }
              return !0;
            }),
            kt((t) => t !== Ku),
            hr(1)
          )
        );
      }
      function SS(e) {
        return (function kT(...e) {
          return Jg(e);
        })(
          vt((t) => {
            if (ai(t)) throw vS(0, t);
          }),
          te((t) => !0 === t)
        );
      }
      class Qu {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class MS {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function _o(e) {
        return fo(new Qu(e));
      }
      function TS(e) {
        return fo(new MS(e));
      }
      class A$ {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new v(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return H(r);
            if (i.numberOfChildren > 1 || !i.children[J])
              return fo(new v(4e3, !1));
            i = i.children[J];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i);
          return new go(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([i, o]) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, l]) => {
              s[a] = this.createSegmentGroup(t, l, r, i);
            }),
            new ye(o, s)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i) throw new v(4001, !1);
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      const yg = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function R$(e, t, n, r, i) {
        const o = vg(e, t, n);
        return o.matched
          ? ((r = (function JH(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Vf(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function M$(e, t, n, r) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? H(
                    i.map((s) => {
                      const a = yo(s, e);
                      return Pr(
                        (function g$(e) {
                          return e && na(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(vo(), SS())
                : H(!0);
            })(r, t, n).pipe(te((s) => (!0 === s ? o : { ...yg }))))
          : H(o);
      }
      function vg(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...yg }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || lH)(n, e, t);
        if (!i) return { ...yg };
        const o = {};
        Object.entries(i.posParams ?? {}).forEach(([a, l]) => {
          o[a] = l.path;
        });
        const s =
          i.consumed.length > 0
            ? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: n.slice(i.consumed.length),
          parameters: s,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function IS(e, t, n, r) {
        return n.length > 0 &&
          (function N$(e, t, n) {
            return n.some((r) => Zu(e, t, r) && vn(r) !== J);
          })(e, n, r)
          ? {
              segmentGroup: new ye(t, O$(r, new ye(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function x$(e, t, n) {
              return n.some((r) => Zu(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new ye(e.segments, P$(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new ye(e.segments, e.children), slicedSegments: n };
      }
      function P$(e, t, n, r, i) {
        const o = {};
        for (const s of r)
          if (Zu(e, n, s) && !i[vn(s)]) {
            const a = new ye([], {});
            o[vn(s)] = a;
          }
        return { ...i, ...o };
      }
      function O$(e, t) {
        const n = {};
        n[J] = t;
        for (const r of e)
          if ("" === r.path && vn(r) !== J) {
            const i = new ye([], {});
            n[vn(r)] = i;
          }
        return n;
      }
      function Zu(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class V$ {
        constructor(t, n, r, i, o, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = i),
            (this.urlTree = o),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new A$(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new v(4002, !1);
        }
        recognize() {
          const t = IS(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            J
          ).pipe(
            Rr((n) => {
              if (n instanceof MS)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Qu ? this.noMatchError(n) : n;
            }),
            te((n) => {
              const r = new Gu(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  J,
                  this.rootComponentType,
                  null,
                  {}
                ),
                i = new pr(r, n),
                o = new gS("", i),
                s = (function IH(e, t, n = null, r = null) {
                  return iS(rS(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (o.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(o._root),
                { state: o, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            J
          ).pipe(
            Rr((r) => {
              throw r instanceof Qu ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = pS(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, i, !0);
        }
        processChildren(t, n, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return We(i).pipe(
            ho((o) => {
              const s = r.children[o],
                a = (function r$(e, t) {
                  const n = e.filter((r) => vn(r) === t);
                  return n.push(...e.filter((r) => vn(r) !== t)), n;
                })(n, o);
              return this.processSegmentGroup(t, a, s, o);
            }),
            Lb((o, s) => (o.push(...s), o)),
            Lu(null),
            (function oH(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? kt((i, o) => e(i, o, r)) : $n,
                  tg(1),
                  n ? Lu(t) : z0(() => new ku())
                );
            })(),
            qe((o) => {
              if (null === o) return _o(r);
              const s = AS(o);
              return (
                (function j$(e) {
                  e.sort((t, n) =>
                    t.value.outlet === J
                      ? -1
                      : n.value.outlet === J
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                H(s)
              );
            })
          );
        }
        processSegment(t, n, r, i, o, s) {
          return We(n).pipe(
            ho((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                i,
                o,
                s
              ).pipe(
                Rr((l) => {
                  if (l instanceof Qu) return H(null);
                  throw l;
                })
              )
            ),
            oi((a) => !!a),
            Rr((a) => {
              if (bS(a))
                return (function k$(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, i, o)
                  ? H([])
                  : _o(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return (function F$(e, t, n, r) {
            return (
              !!(vn(e) === r || (r !== J && Zu(t, n, e))) &&
              ("**" === e.path || vg(t, e, n).matched)
            );
          })(r, i, o, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, i, r, o, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, i, n, r, o, s)
              : _o(i)
            : _o(i);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? TS(o)
            : this.applyRedirects.lineralizeSegments(r, o).pipe(
                qe((s) => {
                  const a = new ye(s, {});
                  return this.processSegment(t, n, a, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = vg(n, i, o);
          if (!a) return _o(n);
          const d = this.applyRedirects.applyRedirectCommands(
            l,
            i.redirectTo,
            c
          );
          return i.redirectTo.startsWith("/")
            ? TS(d)
            : this.applyRedirects
                .lineralizeSegments(i, d)
                .pipe(
                  qe((f) => this.processSegment(t, r, n, f.concat(u), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, i, o, s) {
          let a;
          if ("**" === r.path) {
            const l = i.length > 0 ? q0(i).parameters : {};
            (a = H({
              snapshot: new Gu(
                i,
                l,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                RS(r),
                vn(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                PS(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = R$(n, r, i, t).pipe(
              te(
                ({
                  matched: l,
                  consumedSegments: u,
                  remainingSegments: c,
                  parameters: d,
                }) =>
                  l
                    ? {
                        snapshot: new Gu(
                          u,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          RS(r),
                          vn(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          PS(r)
                        ),
                        consumedSegments: u,
                        remainingSegments: c,
                      }
                    : null
              )
            );
          return a.pipe(
            Vt((l) =>
              null === l
                ? _o(n)
                : this.getChildConfig((t = r._injector ?? t), r, i).pipe(
                    Vt(({ routes: u }) => {
                      const c = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = l,
                        { segmentGroup: p, slicedSegments: g } = IS(n, f, h, u);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(c, u, p).pipe(
                          te((C) => (null === C ? null : [new pr(d, C)]))
                        );
                      if (0 === u.length && 0 === g.length)
                        return H([new pr(d, [])]);
                      const m = vn(r) === o;
                      return this.processSegment(
                        c,
                        u,
                        p,
                        g,
                        m ? J : o,
                        !0
                      ).pipe(te((C) => [new pr(d, C)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? H({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? H({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function S$(e, t, n, r) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? H(!0)
                    : H(
                        i.map((s) => {
                          const a = yo(s, e);
                          return Pr(
                            (function d$(e) {
                              return e && na(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(vo(), SS());
                })(t, n, r).pipe(
                  qe((i) =>
                    i
                      ? this.configLoader.loadChildren(t, n).pipe(
                          vt((o) => {
                            (n._loadedRoutes = o.routes),
                              (n._loadedInjector = o.injector);
                          })
                        )
                      : (function I$(e) {
                          return fo(_S(!1, 3));
                        })()
                  )
                )
            : H({ routes: [], injector: t });
        }
      }
      function U$(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function AS(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!U$(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = AS(r.children);
          t.push(new pr(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function RS(e) {
        return e.data || {};
      }
      function PS(e) {
        return e.resolve || {};
      }
      function OS(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function _g(e) {
        return Vt((t) => {
          const n = e(t);
          return n ? We(n).pipe(te(() => t)) : H(t);
        });
      }
      const Do = new S("ROUTES");
      let Dg = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = M(Cw));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return H(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Pr(n.loadComponent()).pipe(
                te(NS),
                vt((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = o);
                }),
                Hs(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new $0(r, () => new ke()).pipe(eg());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return H({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                te((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l, u;
                  return (
                    Array.isArray(a)
                      ? (u = a)
                      : ((l = a.create(n).injector),
                        (u = l.get(Do, [], U.Self | U.Optional).flat())),
                    { routes: u.map(mg), injector: l }
                  );
                }),
                Hs(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new $0(o, () => new ke()).pipe(eg());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Pr(n()).pipe(
              te(NS),
              qe((r) =>
                r instanceof AC || Array.isArray(r)
                  ? H(r)
                  : We(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function NS(e) {
        return (function W$(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Yu = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new ke()),
              (this.configLoader = M(Dg)),
              (this.environmentInjector = M(Rn)),
              (this.urlSerializer = M(Gs)),
              (this.rootContexts = M(Ys)),
              (this.inputBindingEnabled = null !== M(qu, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => H(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (i) =>
                this.events.next(new BH(i))),
              (this.configLoader.onLoadStartListener = (i) =>
                this.events.next(new UH(i)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new rt({
                id: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Qs,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                kt((r) => 0 !== r.id),
                te((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Vt((r) => {
                  let i = !1,
                    o = !1;
                  return H(r).pipe(
                    vt((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Vt((s) => {
                      const a = n.browserUrlTree.toString(),
                        l =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Zs(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          an
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          xS(s.source) && (n.browserUrlTree = s.extractedUrl),
                          H(s).pipe(
                            Vt((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new ag(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? an
                                  : Promise.resolve(c)
                              );
                            }),
                            (function B$(e, t, n, r, i, o) {
                              return qe((s) =>
                                (function L$(
                                  e,
                                  t,
                                  n,
                                  r,
                                  i,
                                  o,
                                  s = "emptyOnly"
                                ) {
                                  return new V$(
                                    e,
                                    t,
                                    n,
                                    r,
                                    i,
                                    s,
                                    o
                                  ).recognize();
                                })(e, t, n, r, s.extractedUrl, i, o).pipe(
                                  te(({ state: a, tree: l }) => ({
                                    ...s,
                                    targetSnapshot: a,
                                    urlAfterRedirects: l,
                                  }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            vt((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                (r.urlAfterRedirects = c.urlAfterRedirects),
                                (this.currentNavigation = {
                                  ...this.currentNavigation,
                                  finalUrl: c.urlAfterRedirects,
                                }),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new FH(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new ag(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const m = hS(0, this.rootComponentType).snapshot;
                        return H(
                          (r = {
                            ...s,
                            targetSnapshot: m,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Zs(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          an
                        );
                      }
                    }),
                    vt((s) => {
                      const a = new kH(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    te(
                      (s) =>
                        (r = {
                          ...s,
                          guards: s$(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function y$(e, t) {
                      return qe((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: i,
                          guards: {
                            canActivateChecks: o,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === o.length
                          ? H({ ...n, guardsResult: !0 })
                          : (function v$(e, t, n, r) {
                              return We(e).pipe(
                                qe((i) =>
                                  (function b$(e, t, n, r, i) {
                                    const o =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return o && 0 !== o.length
                                      ? H(
                                          o.map((a) => {
                                            const l = Js(t) ?? i,
                                              u = yo(a, l);
                                            return Pr(
                                              (function p$(e) {
                                                return e && na(e.canDeactivate);
                                              })(u)
                                                ? u.canDeactivate(e, t, n, r)
                                                : l.runInContext(() =>
                                                    u(e, t, n, r)
                                                  )
                                            ).pipe(oi());
                                          })
                                        ).pipe(vo())
                                      : H(!0);
                                  })(i.component, i.route, n, t, r)
                                ),
                                oi((i) => !0 !== i, !0)
                              );
                            })(s, r, i, e).pipe(
                              qe((a) =>
                                a &&
                                (function c$(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function _$(e, t, n, r) {
                                      return We(t).pipe(
                                        ho((i) =>
                                          Jp(
                                            (function C$(e, t) {
                                              return (
                                                null !== e && t && t(new HH(e)),
                                                H(!0)
                                              );
                                            })(i.route.parent, r),
                                            (function D$(e, t) {
                                              return (
                                                null !== e && t && t(new zH(e)),
                                                H(!0)
                                              );
                                            })(i.route, r),
                                            (function E$(e, t, n) {
                                              const r = t[t.length - 1],
                                                o = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function a$(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    H0(() =>
                                                      H(
                                                        s.guards.map((l) => {
                                                          const u =
                                                              Js(s.node) ?? n,
                                                            c = yo(l, u);
                                                          return Pr(
                                                            (function h$(e) {
                                                              return (
                                                                e &&
                                                                na(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : u.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(oi());
                                                        })
                                                      ).pipe(vo())
                                                    )
                                                  );
                                              return H(o).pipe(vo());
                                            })(e, i.path, n),
                                            (function w$(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return H(!0);
                                              const i = r.map((o) =>
                                                H0(() => {
                                                  const s = Js(t) ?? n,
                                                    a = yo(o, s);
                                                  return Pr(
                                                    (function f$(e) {
                                                      return (
                                                        e && na(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(oi());
                                                })
                                              );
                                              return H(i).pipe(vo());
                                            })(e, i.route, n)
                                          )
                                        ),
                                        oi((i) => !0 !== i, !0)
                                      );
                                    })(r, o, e, t)
                                  : H(a)
                              ),
                              te((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    vt((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), ai(s.guardsResult))
                      )
                        throw vS(0, s.guardsResult);
                      const a = new LH(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    kt(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    _g((s) => {
                      if (s.guards.canActivateChecks.length)
                        return H(s).pipe(
                          vt((a) => {
                            const l = new VH(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Vt((a) => {
                            let l = !1;
                            return H(a).pipe(
                              (function H$(e, t) {
                                return qe((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: i },
                                  } = n;
                                  if (!i.length) return H(n);
                                  let o = 0;
                                  return We(i).pipe(
                                    ho((s) =>
                                      (function $$(e, t, n, r) {
                                        const i = e.routeConfig,
                                          o = e._resolve;
                                        return (
                                          void 0 !== i?.title &&
                                            !OS(i) &&
                                            (o[$s] = i.title),
                                          (function z$(e, t, n, r) {
                                            const i = (function G$(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === i.length) return H({});
                                            const o = {};
                                            return We(i).pipe(
                                              qe((s) =>
                                                (function q$(e, t, n, r) {
                                                  const i = Js(t) ?? r,
                                                    o = yo(e, i);
                                                  return Pr(
                                                    o.resolve
                                                      ? o.resolve(t, n)
                                                      : i.runInContext(() =>
                                                          o(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  oi(),
                                                  vt((a) => {
                                                    o[s] = a;
                                                  })
                                                )
                                              ),
                                              tg(1),
                                              (function sH(e) {
                                                return te(() => e);
                                              })(o),
                                              Rr((s) => (bS(s) ? an : fo(s)))
                                            );
                                          })(o, e, t, r).pipe(
                                            te(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = pS(e, n).resolve),
                                                i &&
                                                  OS(i) &&
                                                  (e.data[$s] = i.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    vt(() => o++),
                                    tg(1),
                                    qe((s) => (o === i.length ? H(n) : an))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              vt({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          vt((a) => {
                            const l = new jH(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    _g((s) => {
                      const a = (l) => {
                        const u = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              vt((c) => {
                                l.component = c;
                              }),
                              te(() => {})
                            )
                          );
                        for (const c of l.children) u.push(...a(c));
                        return u;
                      };
                      return Xp(a(s.targetSnapshot.root)).pipe(Lu(), hr(1));
                    }),
                    _g(() => this.afterPreactivation()),
                    te((s) => {
                      const a = (function ZH(e, t, n) {
                        const r = Xs(e, t._root, n ? n._root : void 0);
                        return new fS(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    vt((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n, r) =>
                      te(
                        (i) => (
                          new o$(
                            t,
                            i.targetRouterState,
                            i.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          i
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (s) => this.events.next(s),
                      this.inputBindingEnabled
                    ),
                    hr(1),
                    vt({
                      next: (s) => {
                        (i = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new li(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        i = !0;
                      },
                    }),
                    Hs(() => {
                      i || o || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Rr((s) => {
                      if (((o = !0), CS(s))) {
                        DS(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new zu(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), DS(s))) {
                          const l = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            u = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || xS(r.source),
                            };
                          n.scheduleNavigation(l, Qs, null, u, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new lg(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return an;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, i) {
            const o = new zu(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              i
            );
            this.events.next(o), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function xS(e) {
        return e !== Qs;
      }
      let FS = (() => {
          class e {
            buildTitle(n) {
              let r,
                i = n.root;
              for (; void 0 !== i; )
                (r = this.getResolvedTitleForRoute(i) ?? r),
                  (i = i.children.find((o) => o.outlet === J));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[$s];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return M(K$);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        K$ = (() => {
          class e extends FS {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(qE));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Q$ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return M(Y$);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Z$ {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let Y$ = (() => {
        class e extends Z$ {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = tt(e)))(r || e);
            };
          })()),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Xu = new S("", { providedIn: "root", factory: () => ({}) });
      let X$ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({
              token: e,
              factory: function () {
                return M(J$);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        J$ = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      var Qt = (() => (
        ((Qt = Qt || {})[(Qt.COMPLETE = 0)] = "COMPLETE"),
        (Qt[(Qt.FAILED = 1)] = "FAILED"),
        (Qt[(Qt.REDIRECTING = 2)] = "REDIRECTING"),
        Qt
      ))();
      function kS(e, t) {
        e.events
          .pipe(
            kt(
              (n) =>
                n instanceof li ||
                n instanceof zu ||
                n instanceof lg ||
                n instanceof Zs
            ),
            te((n) =>
              n instanceof li || n instanceof Zs
                ? Qt.COMPLETE
                : n instanceof zu && (0 === n.code || 1 === n.code)
                ? Qt.REDIRECTING
                : Qt.FAILED
            ),
            kt((n) => n !== Qt.REDIRECTING),
            hr(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function e3(e) {
        throw e;
      }
      function t3(e, t, n) {
        return t.parse("/");
      }
      const n3 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        r3 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let $e = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = M(Dw)),
                (this.isNgZoneEnabled = !1),
                (this.options = M(Xu, { optional: !0 }) || {}),
                (this.pendingTasks = M(Gl)),
                (this.errorHandler = this.options.errorHandler || e3),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || t3),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = M(X$)),
                (this.routeReuseStrategy = M(Q$)),
                (this.titleStrategy = M(FS)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = M(Do, { optional: !0 })?.flat() ?? []),
                (this.navigationTransitions = M(Yu)),
                (this.urlSerializer = M(Gs)),
                (this.location = M(wh)),
                (this.componentInputBindingEnabled = !!M(qu, { optional: !0 })),
                (this.isNgZoneEnabled =
                  M(me) instanceof me && me.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new go()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = hS(0, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                );
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n),
                (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const n = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Qs, n);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((n) => {
                  const r = "popstate" === n.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(n.url, r, n.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(n, r, i) {
              const o = { replaceUrl: !0 },
                s = i?.navigationId ? i : null;
              if (i) {
                const l = { ...i };
                delete l.navigationId,
                  delete l.ɵrouterPageId,
                  0 !== Object.keys(l).length && (o.state = l);
              }
              const a = this.parseUrl(n);
              this.scheduleNavigation(a, r, s, o);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            get lastSuccessfulNavigation() {
              return this.navigationTransitions.lastSuccessfulNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(mg)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(n, r = {}) {
              const {
                  relativeTo: i,
                  queryParams: o,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: l,
                } = r,
                u = l ? this.currentUrlTree.fragment : s;
              let d,
                c = null;
              switch (a) {
                case "merge":
                  c = { ...this.currentUrlTree.queryParams, ...o };
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = o || null;
              }
              null !== c && (c = this.removeEmptyProps(c));
              try {
                d = rS(i ? i.snapshot : this.routerState.snapshot.root);
              } catch {
                ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                  (d = this.currentUrlTree.root);
              }
              return iS(d, n, c, u ?? null);
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const i = ai(n) ? n : this.parseUrl(n),
                o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
              return this.scheduleNavigation(o, Qs, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function i3(e) {
                  for (let t = 0; t < e.length; t++)
                    if (null == e[t]) throw new v(4008, !1);
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              let r;
              try {
                r = this.urlSerializer.parse(n);
              } catch (i) {
                r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
              }
              return r;
            }
            isActive(n, r) {
              let i;
              if (
                ((i = !0 === r ? { ...n3 } : !1 === r ? { ...r3 } : r), ai(n))
              )
                return K0(this.currentUrlTree, n, i);
              const o = this.parseUrl(n);
              return K0(this.currentUrlTree, o, i);
            }
            removeEmptyProps(n) {
              return Object.keys(n).reduce((r, i) => {
                const o = n[i];
                return null != o && (r[i] = o), r;
              }, {});
            }
            scheduleNavigation(n, r, i, o, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, l, u;
              s
                ? ((a = s.resolve), (l = s.reject), (u = s.promise))
                : (u = new Promise((d, f) => {
                    (a = d), (l = f);
                  }));
              const c = this.pendingTasks.add();
              return (
                kS(this, () => {
                  Promise.resolve().then(() => this.pendingTasks.remove(c));
                }),
                this.navigationTransitions.handleNavigationRequest({
                  source: r,
                  restoredState: i,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: o,
                  resolve: a,
                  reject: l,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(n, r) {
              const i = this.urlSerializer.serialize(n);
              if (
                this.location.isCurrentPathEqualTo(i) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, this.browserPageId),
                };
                this.location.replaceState(i, "", s);
              } else {
                const o = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(
                    r.id,
                    (this.browserPageId ?? 0) + 1
                  ),
                };
                this.location.go(i, "", o);
              }
            }
            restoreHistory(n, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const o =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== o
                  ? this.location.historyGo(o)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === o &&
                    (this.resetState(n),
                    (this.browserUrlTree = n.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = n.currentRouterState),
                (this.currentUrlTree = n.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(n, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Ju = (() => {
          class e {
            constructor(n, r, i, o, s, a) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = i),
                (this.renderer = o),
                (this.el = s),
                (this.locationStrategy = a),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new ke()),
                (this.preserveFragment = !1),
                (this.skipLocationChange = !1),
                (this.replaceUrl = !1);
              const l = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === l || "area" === l),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe((u) => {
                      u instanceof li && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(n, r, i, o, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== n ||
                      r ||
                      i ||
                      o ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const n =
                null === this.href
                  ? null
                  : (function kv(e, t, n) {
                      return (function NP(e, t) {
                        return ("src" === t &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === t && ("base" === e || "link" === e))
                          ? Fv
                          : xv;
                      })(
                        t,
                        n
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", n);
            }
            applyAttributeValue(n, r) {
              const i = this.renderer,
                o = this.el.nativeElement;
              null !== r ? i.setAttribute(o, n, r) : i.removeAttribute(o, n);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                _($e),
                _(Or),
                (function Qa(e) {
                  return (function eR(e, t) {
                    if ("class" === t) return e.classes;
                    if ("style" === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let i = 0;
                      for (; i < r; ) {
                        const o = n[i];
                        if (Nm(o)) break;
                        if (0 === o) i += 2;
                        else if ("number" == typeof o)
                          for (i++; i < r && "string" == typeof n[i]; ) i++;
                        else {
                          if (o === t) return n[i + 1];
                          i += 2;
                        }
                      }
                    }
                    return null;
                  })(it(), e);
                })("tabindex"),
                _(Yn),
                _(Pt),
                _(ei)
              );
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (n, r) {
                1 & n &&
                  le("click", function (o) {
                    return r.onClick(
                      o.button,
                      o.ctrlKey,
                      o.shiftKey,
                      o.altKey,
                      o.metaKey
                    );
                  }),
                  2 & n && Nt("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: ["preserveFragment", "preserveFragment", ao],
                skipLocationChange: [
                  "skipLocationChange",
                  "skipLocationChange",
                  ao,
                ],
                replaceUrl: ["replaceUrl", "replaceUrl", ao],
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [G_, Xt],
            })),
            e
          );
        })(),
        LS = (() => {
          class e {
            get isActive() {
              return this._isActive;
            }
            constructor(n, r, i, o, s) {
              (this.router = n),
                (this.element = r),
                (this.renderer = i),
                (this.cdr = o),
                (this.link = s),
                (this.classes = []),
                (this._isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new Se()),
                (this.routerEventsSubscription = n.events.subscribe((a) => {
                  a instanceof li && this.update();
                }));
            }
            ngAfterContentInit() {
              H(this.links.changes, H(null))
                .pipe(_i())
                .subscribe((n) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const n = [...this.links.toArray(), this.link]
                .filter((r) => !!r)
                .map((r) => r.onChanges);
              this.linkInputChangesSubscription = We(n)
                .pipe(_i())
                .subscribe((r) => {
                  this._isActive !== this.isLinkActive(this.router)(r) &&
                    this.update();
                });
            }
            set routerLinkActive(n) {
              const r = Array.isArray(n) ? n : n.split(" ");
              this.classes = r.filter((i) => !!i);
            }
            ngOnChanges(n) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const n = this.hasActiveLinks();
                  this._isActive !== n &&
                    ((this._isActive = n),
                    this.cdr.markForCheck(),
                    this.classes.forEach((r) => {
                      n
                        ? this.renderer.addClass(this.element.nativeElement, r)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            r
                          );
                    }),
                    n && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          "aria-current",
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          "aria-current"
                        ),
                    this.isActiveChange.emit(n));
                });
            }
            isLinkActive(n) {
              const r = (function o3(e) {
                return !!e.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (i) => !!i.urlTree && n.isActive(i.urlTree, r);
            }
            hasActiveLinks() {
              const n = this.isLinkActive(this.router);
              return (this.link && n(this.link)) || this.links.some(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_($e), _(Pt), _(Yn), _(Kl), _(Ju, 8));
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (n, r, i) {
                if ((1 & n && JC(i, Ju, 5), 2 & n)) {
                  let o;
                  XC(
                    (o = (function ew() {
                      return (function RF(e, t) {
                        return e[En].queries[t].queryList;
                      })(b(), yy());
                    })())
                  ) && (r.links = o);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                ariaCurrentWhenActive: "ariaCurrentWhenActive",
                routerLinkActive: "routerLinkActive",
              },
              outputs: { isActiveChange: "isActiveChange" },
              exportAs: ["routerLinkActive"],
              standalone: !0,
              features: [Xt],
            })),
            e
          );
        })();
      class VS {}
      let s3 = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.router = n),
              (this.injector = i),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                kt((n) => n instanceof li),
                ho(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const i = [];
            for (const o of r) {
              o.providers &&
                !o._injector &&
                (o._injector = Vf(o.providers, n, `Route: ${o.path}`));
              const s = o._injector ?? n,
                a = o._loadedInjector ?? s;
              ((o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
                (o.loadComponent && !o._loadedComponent)) &&
                i.push(this.preloadConfig(s, o)),
                (o.children || o._loadedRoutes) &&
                  i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return We(i).pipe(_i());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : H(null);
              const o = i.pipe(
                qe((s) =>
                  null === s
                    ? H(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? We([o, this.loader.loadComponent(r)]).pipe(_i())
                : o;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w($e), w(Cw), w(Rn), w(VS), w(Dg));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Cg = new S("");
      let jS = (() => {
        class e {
          constructor(n, r, i, o, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = i),
              (this.zone = o),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof ag
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof li
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof Zs &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof cS &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new cS(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function __() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function gr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function BS() {
        const e = M(Ot);
        return (t) => {
          const n = e.get(or);
          if (t !== n.components[0]) return;
          const r = e.get($e),
            i = e.get(HS);
          1 === e.get(wg) && r.initialNavigation(),
            e.get($S, null, U.Optional)?.setUpPreloading(),
            e.get(Cg, null, U.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            i.closed || (i.next(), i.complete(), i.unsubscribe());
        };
      }
      const HS = new S("", { factory: () => new ke() }),
        wg = new S("", { providedIn: "root", factory: () => 1 }),
        $S = new S("");
      function c3(e) {
        return gr(0, [
          { provide: $S, useExisting: s3 },
          { provide: VS, useExisting: e },
        ]);
      }
      const zS = new S("ROUTER_FORROOT_GUARD"),
        f3 = [
          wh,
          { provide: Gs, useClass: ng },
          $e,
          Ys,
          {
            provide: Or,
            useFactory: function US(e) {
              return e.routerState.root;
            },
            deps: [$e],
          },
          Dg,
          [],
        ];
      function h3() {
        return new Ow("Router", $e);
      }
      let GS = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                f3,
                [],
                { provide: Do, multi: !0, useValue: n },
                {
                  provide: zS,
                  useFactory: y3,
                  deps: [[$e, new Xa(), new Ja()]],
                },
                { provide: Xu, useValue: r || {} },
                r?.useHash
                  ? { provide: ei, useClass: Yk }
                  : { provide: ei, useClass: sE },
                {
                  provide: Cg,
                  useFactory: () => {
                    const e = M(fV),
                      t = M(me),
                      n = M(Xu),
                      r = M(Yu),
                      i = M(Gs);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new jS(i, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? c3(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Ow, multi: !0, useFactory: h3 },
                r?.initialNavigation ? v3(r) : [],
                r?.bindToComponentInputs
                  ? gr(8, [yS, { provide: qu, useExisting: yS }]).ɵproviders
                  : [],
                [
                  { provide: qS, useFactory: BS },
                  { provide: dh, multi: !0, useExisting: qS },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Do, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(zS, 8));
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({})),
          e
        );
      })();
      function y3(e) {
        return "guarded";
      }
      function v3(e) {
        return [
          "disabled" === e.initialNavigation
            ? gr(3, [
                {
                  provide: nh,
                  multi: !0,
                  useFactory: () => {
                    const t = M($e);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: wg, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? gr(2, [
                { provide: wg, useValue: 0 },
                {
                  provide: nh,
                  multi: !0,
                  deps: [Ot],
                  useFactory: (t) => {
                    const n = t.get(Qk, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const i = t.get($e),
                              o = t.get(HS);
                            kS(i, () => {
                              r(!0);
                            }),
                              (t.get(Yu).afterPreactivation = () => (
                                r(!0), o.closed ? H(void 0) : o
                              )),
                              i.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const qS = new S("");
      let WS = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (i) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Yn), _(Pt));
            }),
            (e.ɵdir = G({ type: e })),
            e
          );
        })(),
        ui = (() => {
          class e extends WS {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = tt(e)))(r || e);
              };
            })()),
            (e.ɵdir = G({ type: e, features: [ge] })),
            e
          );
        })();
      const jn = new S("NgValueAccessor"),
        w3 = { provide: jn, useExisting: Ce(() => ci), multi: !0 },
        b3 = new S("CompositionEventMode");
      let ci = (() => {
        class e extends WS {
          constructor(n, r, i) {
            super(n, r),
              (this._compositionMode = i),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function E3() {
                  const e = Mr() ? Mr().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Yn), _(Pt), _(b3, 8));
          }),
          (e.ɵdir = G({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                le("input", function (o) {
                  return r._handleInput(o.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (o) {
                  return r._compositionEnd(o.target.value);
                });
            },
            features: [Te([w3]), ge],
          })),
          e
        );
      })();
      function Nr(e) {
        return (
          null == e ||
          (("string" == typeof e || Array.isArray(e)) && 0 === e.length)
        );
      }
      function QS(e) {
        return null != e && "number" == typeof e.length;
      }
      const dt = new S("NgValidators"),
        xr = new S("NgAsyncValidators"),
        S3 =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class ft {
        static min(t) {
          return (function ZS(e) {
            return (t) => {
              if (Nr(t.value) || Nr(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n < e
                ? { min: { min: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static max(t) {
          return (function YS(e) {
            return (t) => {
              if (Nr(t.value) || Nr(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n > e
                ? { max: { max: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static required(t) {
          return (function XS(e) {
            return Nr(e.value) ? { required: !0 } : null;
          })(t);
        }
        static requiredTrue(t) {
          return (function JS(e) {
            return !0 === e.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function eM(e) {
            return Nr(e.value) || S3.test(e.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function tM(e) {
            return (t) =>
              Nr(t.value) || !QS(t.value)
                ? null
                : t.value.length < e
                ? {
                    minlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function nM(e) {
            return (t) =>
              QS(t.value) && t.value.length > e
                ? {
                    maxlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function rM(e) {
            if (!e) return ec;
            let t, n;
            return (
              "string" == typeof e
                ? ((n = ""),
                  "^" !== e.charAt(0) && (n += "^"),
                  (n += e),
                  "$" !== e.charAt(e.length - 1) && (n += "$"),
                  (t = new RegExp(n)))
                : ((n = e.toString()), (t = e)),
              (r) => {
                if (Nr(r.value)) return null;
                const i = r.value;
                return t.test(i)
                  ? null
                  : { pattern: { requiredPattern: n, actualValue: i } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return uM(t);
        }
        static composeAsync(t) {
          return cM(t);
        }
      }
      function ec(e) {
        return null;
      }
      function iM(e) {
        return null != e;
      }
      function oM(e) {
        return gs(e) ? We(e) : e;
      }
      function sM(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function aM(e, t) {
        return t.map((n) => n(e));
      }
      function lM(e) {
        return e.map((t) =>
          (function M3(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function uM(e) {
        if (!e) return null;
        const t = e.filter(iM);
        return 0 == t.length
          ? null
          : function (n) {
              return sM(aM(n, t));
            };
      }
      function Eg(e) {
        return null != e ? uM(lM(e)) : null;
      }
      function cM(e) {
        if (!e) return null;
        const t = e.filter(iM);
        return 0 == t.length
          ? null
          : function (n) {
              return (function D3(...e) {
                const t = Ac(e),
                  { args: n, keys: r } = V0(e),
                  i = new De((o) => {
                    const { length: s } = n;
                    if (!s) return void o.complete();
                    const a = new Array(s);
                    let l = s,
                      u = s;
                    for (let c = 0; c < s; c++) {
                      let d = !1;
                      ot(n[c]).subscribe(
                        ve(
                          o,
                          (f) => {
                            d || ((d = !0), u--), (a[c] = f);
                          },
                          () => l--,
                          void 0,
                          () => {
                            (!l || !d) &&
                              (u || o.next(r ? U0(r, a) : a), o.complete());
                          }
                        )
                      );
                    }
                  });
                return t ? i.pipe(j0(t)) : i;
              })(aM(n, t).map(oM)).pipe(te(sM));
            };
      }
      function bg(e) {
        return null != e ? cM(lM(e)) : null;
      }
      function dM(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function fM(e) {
        return e._rawValidators;
      }
      function hM(e) {
        return e._rawAsyncValidators;
      }
      function Sg(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function tc(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function pM(e, t) {
        const n = Sg(t);
        return (
          Sg(e).forEach((i) => {
            tc(n, i) || n.push(i);
          }),
          n
        );
      }
      function gM(e, t) {
        return Sg(t).filter((n) => !tc(e, n));
      }
      class mM {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Eg(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = bg(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class _t extends mM {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Fr extends mM {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class yM {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let ra = (() => {
          class e extends yM {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Fr, 2));
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  kl("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [ge],
            })),
            e
          );
        })(),
        ia = (() => {
          class e extends yM {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(_t, 10));
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  kl("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [ge],
            })),
            e
          );
        })();
      const oa = "VALID",
        rc = "INVALID",
        Co = "PENDING",
        sa = "DISABLED";
      function Ig(e) {
        return (ic(e) ? e.validators : e) || null;
      }
      function Ag(e, t) {
        return (ic(t) ? t.asyncValidators : e) || null;
      }
      function ic(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      function _M(e, t, n) {
        const r = e.controls;
        if (!(t ? Object.keys(r) : r).length) throw new v(1e3, "");
        if (!r[n]) throw new v(1001, "");
      }
      function DM(e, t, n) {
        e._forEachChild((r, i) => {
          if (void 0 === n[i]) throw new v(1002, "");
        });
      }
      class oc {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === oa;
        }
        get invalid() {
          return this.status === rc;
        }
        get pending() {
          return this.status == Co;
        }
        get disabled() {
          return this.status === sa;
        }
        get enabled() {
          return this.status !== sa;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(pM(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(pM(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(gM(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(gM(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return tc(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return tc(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Co),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = sa),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = oa),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === oa || this.status === Co) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? sa : oa;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Co), (this._hasOwnPendingAsyncValidator = !0);
            const n = oM(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, i) => r && r._find(i), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Se()), (this.statusChanges = new Se());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? sa
            : this.errors
            ? rc
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Co)
            ? Co
            : this._anyControlsHaveStatus(rc)
            ? rc
            : oa;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          ic(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function R3(e) {
              return Array.isArray(e) ? Eg(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function P3(e) {
              return Array.isArray(e) ? bg(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class aa extends oc {
        constructor(t, n, r) {
          super(Ig(n), Ag(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          DM(this, 0, t),
            Object.keys(t).forEach((r) => {
              _M(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const i = this.controls[r];
              i && i.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, i) => {
            r.reset(t[i], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, i) => ((r.enabled || this.disabled) && (n[i] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((i, o) => {
              r = n(r, i, o);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      class CM extends aa {}
      const di = new S("CallSetDisabledState", {
          providedIn: "root",
          factory: () => la,
        }),
        la = "always";
      function ua(e, t, n = la) {
        Rg(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function N3(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && wM(e, t);
            });
          })(e, t),
          (function F3(e, t) {
            const n = (r, i) => {
              t.valueAccessor.writeValue(r), i && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function x3(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && wM(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function O3(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function ac(e, t, n = !0) {
        const r = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(r),
          t.valueAccessor.registerOnTouched(r)),
          uc(e, t),
          e &&
            (t._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}));
      }
      function lc(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function Rg(e, t) {
        const n = fM(e);
        null !== t.validator
          ? e.setValidators(dM(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = hM(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(dM(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const i = () => e.updateValueAndValidity();
        lc(t._rawValidators, i), lc(t._rawAsyncValidators, i);
      }
      function uc(e, t) {
        let n = !1;
        if (null !== e) {
          if (null !== t.validator) {
            const i = fM(e);
            if (Array.isArray(i) && i.length > 0) {
              const o = i.filter((s) => s !== t.validator);
              o.length !== i.length && ((n = !0), e.setValidators(o));
            }
          }
          if (null !== t.asyncValidator) {
            const i = hM(e);
            if (Array.isArray(i) && i.length > 0) {
              const o = i.filter((s) => s !== t.asyncValidator);
              o.length !== i.length && ((n = !0), e.setAsyncValidators(o));
            }
          }
        }
        const r = () => {};
        return lc(t._rawValidators, r), lc(t._rawAsyncValidators, r), n;
      }
      function wM(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function SM(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function MM(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const Dt = class extends oc {
        constructor(t = null, n, r) {
          super(Ig(n), Ag(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            ic(n) &&
              (n.nonNullable || n.initialValueIsDefault) &&
              (this.defaultValue = MM(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          SM(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          SM(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          MM(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      let da = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        OM = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      const Fg = new S("NgModelWithFormControlWarning"),
        Q3 = { provide: _t, useExisting: Ce(() => fi) };
      let fi = (() => {
        class e extends _t {
          constructor(n, r, i) {
            super(),
              (this.callSetDisabledState = i),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new Se()),
              this._setValidators(n),
              this._setAsyncValidators(r);
          }
          ngOnChanges(n) {
            this._checkFormPresent(),
              n.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (uc(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(n) {
            const r = this.form.get(n.path);
            return (
              ua(r, n, this.callSetDisabledState),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(n),
              r
            );
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            ac(n.control || null, n, !1),
              (function j3(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
              })(this.directives, n);
          }
          addFormGroup(n) {
            this._setUpFormContainer(n);
          }
          removeFormGroup(n) {
            this._cleanUpFormContainer(n);
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          addFormArray(n) {
            this._setUpFormContainer(n);
          }
          removeFormArray(n) {
            this._cleanUpFormContainer(n);
          }
          getFormArray(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            this.form.get(n.path).setValue(r);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function bM(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n = void 0) {
            this.form.reset(n), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((n) => {
              const r = n.control,
                i = this.form.get(n.path);
              r !== i &&
                (ac(r || null, n),
                ((e) => e instanceof Dt)(i) &&
                  (ua(i, n, this.callSetDisabledState), (n.control = i)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(n) {
            const r = this.form.get(n.path);
            (function EM(e, t) {
              Rg(e, t);
            })(r, n),
              r.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(n) {
            if (this.form) {
              const r = this.form.get(n.path);
              r &&
                (function k3(e, t) {
                  return uc(e, t);
                })(r, n) &&
                r.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Rg(this.form, this), this._oldForm && uc(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(dt, 10), _(xr, 10), _(di, 8));
          }),
          (e.ɵdir = G({
            type: e,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (n, r) {
              1 & n &&
                le("submit", function (o) {
                  return r.onSubmit(o);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [Te([Q3]), ge, Xt],
          })),
          e
        );
      })();
      const X3 = { provide: Fr, useExisting: Ce(() => wo) };
      let wo = (() => {
          class e extends Fr {
            set isDisabled(n) {}
            constructor(n, r, i, o, s) {
              super(),
                (this._ngModelWarningConfig = s),
                (this._added = !1),
                (this.name = null),
                (this.update = new Se()),
                (this._ngModelWarningSent = !1),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(i),
                (this.valueAccessor = (function Ng(e, t) {
                  if (!t) return null;
                  let n, r, i;
                  return (
                    Array.isArray(t),
                    t.forEach((o) => {
                      o.constructor === ci
                        ? (n = o)
                        : (function V3(e) {
                            return Object.getPrototypeOf(e.constructor) === ui;
                          })(o)
                        ? (r = o)
                        : (i = o);
                    }),
                    i || r || n || null
                  );
                })(0, o));
            }
            ngOnChanges(n) {
              this._added || this._setUpControl(),
                (function Og(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            get path() {
              return (function sc(e, t) {
                return [...t.path, e];
              })(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                (this._added = !0);
            }
          }
          return (
            (e._ngModelWarningSentOnce = !1),
            (e.ɵfac = function (n) {
              return new (n || e)(
                _(_t, 13),
                _(dt, 10),
                _(xr, 10),
                _(jn, 10),
                _(Fg, 8)
              );
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [["", "formControlName", ""]],
              inputs: {
                name: ["formControlName", "name"],
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
              },
              outputs: { update: "ngModelChange" },
              features: [Te([X3]), ge, Xt],
            })),
            e
          );
        })(),
        KM = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [OM] })),
            e
          );
        })();
      class QM extends oc {
        constructor(t, n, r) {
          super(Ig(n), Ag(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[this._adjustIndex(t)];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          let r = this._adjustIndex(t);
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          let i = this._adjustIndex(t);
          i < 0 && (i = 0),
            this.controls[i] &&
              this.controls[i]._registerOnCollectionChange(() => {}),
            this.controls.splice(i, 1),
            n && (this.controls.splice(i, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          DM(this, 0, t),
            t.forEach((r, i) => {
              _M(this, !1, i),
                this.at(i).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, i) => {
              this.at(i) &&
                this.at(i).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, i) => {
            r.reset(t[i], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => t.getRawValue());
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _adjustIndex(t) {
          return t < 0 ? t + this.length : t;
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(t) {
          return this.at(t) ?? null;
        }
      }
      function ZM(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        );
      }
      let cc = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1;
            }
            get nonNullable() {
              const n = new e();
              return (n.useNonNullable = !0), n;
            }
            group(n, r = null) {
              const i = this._reduceControls(n);
              let o = {};
              return (
                ZM(r)
                  ? (o = r)
                  : null !== r &&
                    ((o.validators = r.validator),
                    (o.asyncValidators = r.asyncValidator)),
                new aa(i, o)
              );
            }
            record(n, r = null) {
              const i = this._reduceControls(n);
              return new CM(i, r);
            }
            control(n, r, i) {
              let o = {};
              return this.useNonNullable
                ? (ZM(r)
                    ? (o = r)
                    : ((o.validators = r), (o.asyncValidators = i)),
                  new Dt(n, { ...o, nonNullable: !0 }))
                : new Dt(n, r, i);
            }
            array(n, r, i) {
              const o = n.map((s) => this._createControl(s));
              return new QM(o, r, i);
            }
            _reduceControls(n) {
              const r = {};
              return (
                Object.keys(n).forEach((i) => {
                  r[i] = this._createControl(n[i]);
                }),
                r
              );
            }
            _createControl(n) {
              return n instanceof Dt || n instanceof oc
                ? n
                : Array.isArray(n)
                ? this.control(
                    n[0],
                    n.length > 1 ? n[1] : null,
                    n.length > 2 ? n[2] : null
                  )
                : this.control(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        hz = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: di, useValue: n.callSetDisabledState ?? la },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [KM] })),
            e
          );
        })(),
        pz = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: Fg,
                    useValue: n.warnOnNgModelWithFormControl ?? "always",
                  },
                  { provide: di, useValue: n.callSetDisabledState ?? la },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [KM] })),
            e
          );
        })();
      class Un {}
      Un.Emitter = new Se();
      const YM = co("[restaurants DATA API ] API GET"),
        XM = co("[ restaurant DATA RECIVER API] API DATA RECIVER", {
          _as: "props",
          _p: void 0,
        }),
        dc = co("[ full details of restaurant  API] API GET FULL DATA", {
          _as: "props",
          _p: void 0,
        }),
        JM = co(
          "[ recive restaurant full DEtails API] RECIVE ALL RESTAURNAT DATA API",
          { _as: "props", _p: void 0 }
        );
      class fc {}
      class hc {}
      class Bn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((n) => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                          const i = n.slice(0, r),
                            o = i.toLowerCase(),
                            s = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(i, o),
                            this.headers.has(o)
                              ? this.headers.get(o).push(s)
                              : this.headers.set(o, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Bn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Bn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Bn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const i = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              i.push(...r), this.headers.set(n, i);
              break;
            case "d":
              const o = t.value;
              if (o) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((o) => o.toString()),
            i = t.toLowerCase();
          this.headers.set(i, r), this.maybeSetNormalizedName(t, i);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class gz {
        encodeKey(t) {
          return eT(t);
        }
        encodeValue(t) {
          return eT(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const yz = /%(\d[a-f0-9])/gi,
        vz = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function eT(e) {
        return encodeURIComponent(e).replace(yz, (t, n) => vz[n] ?? t);
      }
      function pc(e) {
        return `${e}`;
      }
      class kr {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new gz()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function mz(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [t.decodeKey(i), ""]
                            : [
                                t.decodeKey(i.slice(0, o)),
                                t.decodeValue(i.slice(o + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    i = Array.isArray(r) ? r.map(pc) : [pc(r)];
                  this.map.set(n, i);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const i = t[r];
              Array.isArray(i)
                ? i.forEach((o) => {
                    n.push({ param: r, value: o, op: "a" });
                  })
                : n.push({ param: r, value: i, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new kr({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(pc(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const i = r.indexOf(pc(t.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class _z {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function tT(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function nT(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function rT(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class fa {
        constructor(t, n, r, i) {
          let o;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function Dz(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (o = i))
              : (o = r),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new Bn()),
            this.context || (this.context = new _z()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new kr()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : tT(this.body) ||
              nT(this.body) ||
              rT(this.body) ||
              (function Cz(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof kr
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || rT(this.body)
            ? null
            : nT(this.body)
            ? this.body.type || null
            : tT(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof kr
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            i = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            u = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (u = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                u
              )),
            new fa(n, r, o, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      var ze = (() => (
        ((ze = ze || {})[(ze.Sent = 0)] = "Sent"),
        (ze[(ze.UploadProgress = 1)] = "UploadProgress"),
        (ze[(ze.ResponseHeader = 2)] = "ResponseHeader"),
        (ze[(ze.DownloadProgress = 3)] = "DownloadProgress"),
        (ze[(ze.Response = 4)] = "Response"),
        (ze[(ze.User = 5)] = "User"),
        ze
      ))();
      class Bg {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Bn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Hg extends Bg {
        constructor(t = {}) {
          super(t), (this.type = ze.ResponseHeader);
        }
        clone(t = {}) {
          return new Hg({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Eo extends Bg {
        constructor(t = {}) {
          super(t),
            (this.type = ze.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Eo({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class iT extends Bg {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function $g(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let bo = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, i = {}) {
            let o;
            if (n instanceof fa) o = n;
            else {
              let l, u;
              (l = i.headers instanceof Bn ? i.headers : new Bn(i.headers)),
                i.params &&
                  (u =
                    i.params instanceof kr
                      ? i.params
                      : new kr({ fromObject: i.params })),
                (o = new fa(n, r, void 0 !== i.body ? i.body : null, {
                  headers: l,
                  context: i.context,
                  params: u,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const s = H(o).pipe(ho((l) => this.handler.handle(l)));
            if (n instanceof fa || "events" === i.observe) return s;
            const a = s.pipe(kt((l) => l instanceof Eo));
            switch (i.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      te((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      te((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      te((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(te((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new kr().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, i = {}) {
            return this.request("PATCH", n, $g(i, r));
          }
          post(n, r, i = {}) {
            return this.request("POST", n, $g(i, r));
          }
          put(n, r, i = {}) {
            return this.request("PUT", n, $g(i, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(fc));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function aT(e, t) {
        return t(e);
      }
      function Ez(e, t) {
        return (n, r) => t.intercept(n, { handle: (i) => e(i, r) });
      }
      const lT = new S(""),
        ha = new S(""),
        uT = new S("");
      function Sz() {
        let e = null;
        return (t, n) => {
          null === e &&
            (e = (M(lT, { optional: !0 }) ?? []).reduceRight(Ez, aT));
          const r = M(Gl),
            i = r.add();
          return e(t, n).pipe(Hs(() => r.remove(i)));
        };
      }
      let cT = (() => {
        class e extends fc {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null),
              (this.pendingTasks = M(Gl));
          }
          handle(n) {
            if (null === this.chain) {
              const i = Array.from(
                new Set([
                  ...this.injector.get(ha),
                  ...this.injector.get(uT, []),
                ])
              );
              this.chain = i.reduceRight(
                (o, s) =>
                  (function bz(e, t, n) {
                    return (r, i) => n.runInContext(() => t(r, (o) => e(o, i)));
                  })(o, s, this.injector),
                aT
              );
            }
            const r = this.pendingTasks.add();
            return this.chain(n, (i) => this.backend.handle(i)).pipe(
              Hs(() => this.pendingTasks.remove(r))
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(hc), w(Rn));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Az = /^\)\]\}',?\n/;
      let fT = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method) throw new v(-2800, !1);
            const r = this.xhrFactory;
            return (r.ɵloadImpl ? We(r.ɵloadImpl()) : H(null)).pipe(
              Vt(
                () =>
                  new De((o) => {
                    const s = r.build();
                    if (
                      (s.open(n.method, n.urlWithParams),
                      n.withCredentials && (s.withCredentials = !0),
                      n.headers.forEach((g, m) =>
                        s.setRequestHeader(g, m.join(","))
                      ),
                      n.headers.has("Accept") ||
                        s.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !n.headers.has("Content-Type"))
                    ) {
                      const g = n.detectContentTypeHeader();
                      null !== g && s.setRequestHeader("Content-Type", g);
                    }
                    if (n.responseType) {
                      const g = n.responseType.toLowerCase();
                      s.responseType = "json" !== g ? g : "text";
                    }
                    const a = n.serializeBody();
                    let l = null;
                    const u = () => {
                        if (null !== l) return l;
                        const g = s.statusText || "OK",
                          m = new Bn(s.getAllResponseHeaders()),
                          C =
                            (function Rz(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(s) || n.url;
                        return (
                          (l = new Hg({
                            headers: m,
                            status: s.status,
                            statusText: g,
                            url: C,
                          })),
                          l
                        );
                      },
                      c = () => {
                        let {
                            headers: g,
                            status: m,
                            statusText: C,
                            url: y,
                          } = u(),
                          A = null;
                        204 !== m &&
                          (A =
                            typeof s.response > "u"
                              ? s.responseText
                              : s.response),
                          0 === m && (m = A ? 200 : 0);
                        let F = m >= 200 && m < 300;
                        if ("json" === n.responseType && "string" == typeof A) {
                          const V = A;
                          A = A.replace(Az, "");
                          try {
                            A = "" !== A ? JSON.parse(A) : null;
                          } catch (fe) {
                            (A = V),
                              F && ((F = !1), (A = { error: fe, text: A }));
                          }
                        }
                        F
                          ? (o.next(
                              new Eo({
                                body: A,
                                headers: g,
                                status: m,
                                statusText: C,
                                url: y || void 0,
                              })
                            ),
                            o.complete())
                          : o.error(
                              new iT({
                                error: A,
                                headers: g,
                                status: m,
                                statusText: C,
                                url: y || void 0,
                              })
                            );
                      },
                      d = (g) => {
                        const { url: m } = u(),
                          C = new iT({
                            error: g,
                            status: s.status || 0,
                            statusText: s.statusText || "Unknown Error",
                            url: m || void 0,
                          });
                        o.error(C);
                      };
                    let f = !1;
                    const h = (g) => {
                        f || (o.next(u()), (f = !0));
                        let m = { type: ze.DownloadProgress, loaded: g.loaded };
                        g.lengthComputable && (m.total = g.total),
                          "text" === n.responseType &&
                            s.responseText &&
                            (m.partialText = s.responseText),
                          o.next(m);
                      },
                      p = (g) => {
                        let m = { type: ze.UploadProgress, loaded: g.loaded };
                        g.lengthComputable && (m.total = g.total), o.next(m);
                      };
                    return (
                      s.addEventListener("load", c),
                      s.addEventListener("error", d),
                      s.addEventListener("timeout", d),
                      s.addEventListener("abort", d),
                      n.reportProgress &&
                        (s.addEventListener("progress", h),
                        null !== a &&
                          s.upload &&
                          s.upload.addEventListener("progress", p)),
                      s.send(a),
                      o.next({ type: ze.Sent }),
                      () => {
                        s.removeEventListener("error", d),
                          s.removeEventListener("abort", d),
                          s.removeEventListener("load", c),
                          s.removeEventListener("timeout", d),
                          n.reportProgress &&
                            (s.removeEventListener("progress", h),
                            null !== a &&
                              s.upload &&
                              s.upload.removeEventListener("progress", p)),
                          s.readyState !== s.DONE && s.abort();
                      }
                    );
                  })
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(IE));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const zg = new S("XSRF_ENABLED"),
        hT = new S("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        pT = new S("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class gT {}
      let Nz = (() => {
        class e {
          constructor(n, r, i) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = i),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = mE(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(w(Xe), w(Qr), w(hT));
          }),
          (e.ɵprov = O({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function xz(e, t) {
        const n = e.url.toLowerCase();
        if (
          !M(zg) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = M(gT).getToken(),
          i = M(pT);
        return (
          null != r &&
            !e.headers.has(i) &&
            (e = e.clone({ headers: e.headers.set(i, r) })),
          t(e)
        );
      }
      var Ie = (() => (
        ((Ie = Ie || {})[(Ie.Interceptors = 0)] = "Interceptors"),
        (Ie[(Ie.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (Ie[(Ie.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (Ie[(Ie.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (Ie[(Ie.JsonpSupport = 4)] = "JsonpSupport"),
        (Ie[(Ie.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        (Ie[(Ie.Fetch = 6)] = "Fetch"),
        Ie
      ))();
      function pi(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Fz(...e) {
        const t = [
          bo,
          fT,
          cT,
          { provide: fc, useExisting: cT },
          { provide: hc, useExisting: fT },
          { provide: ha, useValue: xz, multi: !0 },
          { provide: zg, useValue: !0 },
          { provide: gT, useClass: Nz },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return pl(t);
      }
      const mT = new S("LEGACY_INTERCEPTOR_FN");
      let Lz = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({
              providers: [
                Fz(
                  pi(Ie.LegacyInterceptors, [
                    { provide: mT, useFactory: Sz },
                    { provide: ha, useExisting: mT, multi: !0 },
                  ])
                ),
              ],
            })),
            e
          );
        })(),
        gi = (() => {
          class e {
            constructor(n, r, i) {
              (this.http = n), (this.router = r), (this.resDataStore = i);
            }
            ngOnInit() {}
            LoginSuperDamin(n) {
              console.log("ahiii"),
                console.log(n),
                this.http
                  .post("http://localhost:5000/superadmin/superadminlogin", n, {
                    withCredentials: !0,
                  })
                  .subscribe((r) => {
                    localStorage.setItem("superadmin", r.token),
                      localStorage.setItem("isLoggedIN", "true"),
                      Un.Emitter.emit(!0),
                      this.router.navigate(["/"]);
                  });
            }
            ParnerRegistration(n) {
              console.log(n),
                this.http
                  .post("http://localhost:5000/restaurants/resgister", n, {
                    withCredentials: !0,
                  })
                  .subscribe(
                    () => {
                      (window.location.href = "http://localhost:3200"),
                        window.close();
                    },
                    (r) => console.log(r)
                  );
            }
            InitailLogin(n) {
              return this.http.post(
                "http://localhost:5000/restaurants/initialLogin",
                n,
                { withCredentials: !0 }
              );
            }
            initialLoginWithGoogle(n) {
              return this.http.post(
                "http://localhost:5000/restaurants/initialLogin",
                n,
                { withCredentials: !0 }
              );
            }
            getAllRestaurantsData() {
              return this.http.get(
                "http://localhost:5000/restaurants/get_allRestaurant",
                { withCredentials: !0 }
              );
            }
            fullDetails(n) {
              return (
                console.log(n),
                this.http.get(
                  `http://localhost:5000/restaurants/full_details/${n}`,
                  { withCredentials: !0 }
                )
              );
            }
            listrestaurant(n, r) {
              console.log("list"),
                this.http
                  .post(
                    `http://localhost:5000/restaurants/list_restaurants/${n}`,
                    { status: (r = 1 != r) },
                    { withCredentials: !0 }
                  )
                  .subscribe(
                    (i) => {
                      console.log("listed"),
                        this.router.navigate([this.router.url]),
                        this.resDataStore.dispatch(dc({ id: n }));
                    },
                    (i) => console.log(i)
                  );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(bo), w($e), w(dr));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function $z(e, t) {
        1 & e && (E(0, "label", 23), R(1, "Email is requried"), D());
      }
      function zz(e, t) {
        1 & e &&
          (E(0, "label", 23), R(1, "Email should be proper formate"), D());
      }
      function Gz(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 21),
            L(1, $z, 2, 0, "label", 22),
            L(2, zz, 2, 0, "label", 22),
            D()),
          2 & e)
        ) {
          const n = K();
          I(1),
            P("ngIf", n.submitted && n.form.controls.email.errors.required),
            I(1),
            P("ngIf", n.submitted && n.form.controls.email.errors.email);
        }
      }
      function qz(e, t) {
        1 & e && (E(0, "label", 23), R(1, "Password is requried"), D());
      }
      function Wz(e, t) {
        1 & e && (E(0, "label", 23), R(1, "Password min more than 4 "), D());
      }
      function Kz(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 21),
            L(1, qz, 2, 0, "label", 22),
            L(2, Wz, 2, 0, "label", 22),
            D()),
          2 & e)
        ) {
          const n = K();
          I(1),
            P("ngIf", n.submitted && n.form.controls.password.errors.required),
            I(1),
            P("ngIf", n.submitted && n.form.controls.password.errors.minlength);
        }
      }
      let Qz = (() => {
        class e {
          constructor(n, r, i) {
            (this.servive = n),
              (this.router = r),
              (this.formBuilder = i),
              (this.url = "http://localhost:5000"),
              (this.error = ""),
              (this.submitted = !1);
          }
          ngOnInit() {
            (this.submitted = !1),
              (this.form = this.formBuilder.group({
                email: new Dt("", [ft.required, ft.email]),
                password: new Dt("", [ft.required, ft.minLength(4)]),
              })),
              localStorage.getItem("isLoggedIN")
                ? (this.router.navigate(["/"]), Un.Emitter.emit(!0))
                : (Un.Emitter.emit(!1), this.router.navigate(["/login"]));
          }
          loginSuperAdmin() {
            if (((this.submitted = !0), this.form.invalid)) return;
            let n = this.form.getRawValue();
            this.servive.LoginSuperDamin(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(gi), _($e), _(cc));
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-login"]],
            decls: 32,
            vars: 3,
            consts: [
              [1, "container", "mx-auto"],
              [1, "card", "card0"],
              [1, "d-flex", "flex-lg-row", "flex-column-reverse"],
              [1, "card", "card2"],
              [1, "my-auto", "mx-md-5", "px-md-5", "right"],
              [1, "text-white"],
              [1, "card", "card1"],
              [1, "row", "justify-content-center", "my-auto"],
              [1, "col-md-8", "col-10"],
              [1, "row", "justify-content-center", "px-3", "mb-3"],
              ["id", "logo", "src", "https://i.imgur.com/PSXxjNY.png"],
              [1, "mb-5", "text-center", "heading"],
              [1, "msg-info"],
              [3, "formGroup", "submit"],
              [1, "form-group"],
              [1, "form-control-label", "text-muted"],
              [
                "formControlName",
                "email",
                "type",
                "text",
                "id",
                "email",
                "name",
                "email",
                "placeholder",
                "Phone no or email id",
                1,
                "form-control",
              ],
              ["class", "text-danger emailerror", 4, "ngIf"],
              [
                "formControlName",
                "password",
                "type",
                "password",
                "id",
                "psw",
                "name",
                "psw",
                "placeholder",
                "Password",
                1,
                "form-control",
              ],
              [1, "row", "justify-content-center", "my-3", "px-3"],
              ["type", "submit", 1, "btn-block", "btn-color"],
              [1, "text-danger", "emailerror"],
              ["class", "form-control-label text-danger", 4, "ngIf"],
              [1, "form-control-label", "text-danger"],
            ],
            template: function (n, r) {
              1 & n &&
                (E(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                  4,
                  "div",
                  4
                )(5, "h3", 5),
                R(6, "We are more than just a company"),
                D(),
                E(7, "small", 5),
                R(
                  8,
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                ),
                D()()(),
                E(9, "div", 6)(10, "div", 7)(11, "div", 8)(12, "div", 9),
                de(13, "img", 10),
                D(),
                E(14, "h3", 11),
                R(15, "Welcome To Turfyo"),
                D(),
                E(16, "h6", 12),
                R(17, "Please login to your account"),
                D(),
                E(18, "form", 13),
                le("submit", function () {
                  return r.loginSuperAdmin();
                }),
                E(19, "div", 14)(20, "label", 15),
                R(21, "Email"),
                D(),
                de(22, "input", 16),
                L(23, Gz, 3, 2, "div", 17),
                E(24, "div", 14)(25, "label", 15),
                R(26, "Password"),
                D(),
                de(27, "input", 18),
                L(28, Kz, 3, 2, "div", 17),
                D(),
                E(29, "div", 19)(30, "button", 20),
                R(31, " Login to Turfyo "),
                D()()()()()()()()()()),
                2 & n &&
                  (I(18),
                  P("formGroup", r.form),
                  I(5),
                  P("ngIf", r.form.controls.email.errors),
                  I(5),
                  P("ngIf", r.form.controls.password.errors));
            },
            dependencies: [lr, da, ci, ra, ia, fi, wo],
            styles: [
              ".form-outline[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{border:solid .2px rgb(243,110,8);border-radius:20px;box-shadow:none}body[_ngcontent-%COMP%]{color:#000;overflow-x:hidden;height:100%;background-image:linear-gradient(to right,#D500F9,#FFD54F);background-repeat:no-repeat}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{background-color:#f3e5f5;border-radius:50px!important;padding:12px 15px!important;width:100%;box-sizing:border-box;border:none!important;border:1px solid #F3E5F5!important;font-size:16px!important;color:#000!important;font-weight:400}input[_ngcontent-%COMP%]:focus, textarea[_ngcontent-%COMP%]:focus{box-shadow:none!important;border:1px solid #f98715ec!important;outline-width:0;font-weight:400}button[_ngcontent-%COMP%]:focus{box-shadow:none!important;outline-width:0}.card[_ngcontent-%COMP%]{border-radius:0;border:none}.card1[_ngcontent-%COMP%]{width:50%;padding:40px 30px 10px}.card2[_ngcontent-%COMP%]{width:50%;border-radius:25px;background-image:linear-gradient(to right,#f5c118,#f98715ec)}#logo[_ngcontent-%COMP%]{width:70px;height:60px}.heading[_ngcontent-%COMP%]{margin-bottom:60px!important;font-weight:700;color:#f57b18}[_ngcontent-%COMP%]::placeholder{color:#f98715ec!important;opacity:1}[_ngcontent-%COMP%]:-ms-input-placeholder{color:#f98715ec!important}[_ngcontent-%COMP%]::-ms-input-placeholder{color:#f98715ec!important}.form-control-label[_ngcontent-%COMP%]{font-size:12px;margin-left:15px}.msg-info[_ngcontent-%COMP%]{padding-left:15px;margin-bottom:30px}.btn-color[_ngcontent-%COMP%]{border-radius:50px;color:#fff;background-image:linear-gradient(to right,#f5c118,#f98715ec);padding:15px;cursor:pointer;border:none!important;margin-top:40px}.btn-color[_ngcontent-%COMP%]:hover{color:#fff;background-image:linear-gradient(to right,#f98715ec,#FFD54F)}.btn-white[_ngcontent-%COMP%]{border-radius:50px;color:#d500f9;background-color:#fff;padding:8px 40px;cursor:pointer;border:2px solid #D500F9!important}.btn-white[_ngcontent-%COMP%]:hover{color:#fff;background-image:linear-gradient(to right,#FFD54F,#D500F9)}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:hover{color:#000}.bottom[_ngcontent-%COMP%]{width:100%;margin-top:50px!important}.sm-text[_ngcontent-%COMP%]{font-size:15px}@media screen and (max-width: 992px){.card1[_ngcontent-%COMP%]{width:100%;padding:40px 30px 10px}.card2[_ngcontent-%COMP%]{width:100%}.right[_ngcontent-%COMP%]{margin-top:100px!important;margin-bottom:100px!important}}@media screen and (max-width: 768px){.container[_ngcontent-%COMP%]{padding:10px!important}.card2[_ngcontent-%COMP%]{padding:50px}.right[_ngcontent-%COMP%]{margin-top:50px!important;margin-bottom:50px!important}}.fixed-div[_ngcontent-%COMP%]{position:fixed;top:0;left:0}",
            ],
          })),
          e
        );
      })();
      const Zz = Ou(
          (e) => e.restaurantData,
          (e) => (console.log(e), [...e])
        ),
        Yz = Ou(
          (e) => e.allRestaurantData,
          (e) => (console.log(e), e)
        );
      function Xz(e, t) {
        1 & e &&
          (E(0, "div", 2)(1, "div", 3),
          de(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "div", 7)(6, "div", 8),
          D()());
      }
      function Jz(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "tr")(1, "th", 21),
            R(2),
            D(),
            E(3, "td"),
            R(4),
            D(),
            E(5, "td"),
            R(6),
            D(),
            E(7, "td"),
            R(8),
            D(),
            E(9, "td"),
            R(10),
            D(),
            E(11, "td")(12, "button", 22),
            le("click", function () {
              const o = Tt(n).$implicit;
              return It(K(3).fullDetatils(o._id));
            }),
            R(13, " View "),
            D()()();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = t.index;
          I(2),
            tr(r + 1),
            I(2),
            tr(n.name),
            I(2),
            tr(n.place),
            I(2),
            tr(n.owner_name),
            I(2),
            tr(n.owner_number);
        }
      }
      function e5(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 10)(1, "nav", 11)(2, "div", 12)(3, "h3"),
            R(4, "Super Admin"),
            D()(),
            E(5, "ul", 13)(6, "li", 14)(7, "a", 15),
            R(8, "Restaurant "),
            D()(),
            E(9, "li")(10, "a", 16),
            R(11, "Messages"),
            D()()()(),
            E(12, "div", 17)(13, "table", 18)(14, "thead")(15, "tr")(
              16,
              "th",
              19
            ),
            R(17, "#"),
            D(),
            E(18, "th", 19),
            R(19, "Restaurants Name"),
            D(),
            E(20, "th", 19),
            R(21, "Place"),
            D(),
            E(22, "th", 19),
            R(23, "Owner Name"),
            D(),
            E(24, "th", 19),
            R(25, "Owner Number"),
            D(),
            E(26, "th", 19),
            R(27, "More Details"),
            D()()(),
            E(28, "tbody"),
            L(29, Jz, 14, 5, "tr", 20),
            D()()()()),
          2 & e)
        ) {
          const n = t.ngIf;
          I(29), P("ngForOf", n);
        }
      }
      function t5(e, t) {
        if (
          (1 & e &&
            (E(0, "div"), L(1, e5, 30, 1, "div", 9), Uf(2, "async"), D()),
          2 & e)
        ) {
          const n = K();
          I(1), P("ngIf", Bf(2, 1, n.restaurantData$));
        }
      }
      let n5 = (() => {
        class e {
          constructor(n, r, i, o) {
            (this.http = n),
              (this.router = r),
              (this.servie = i),
              (this.store = o),
              (this.restaurantData$ = this.store.pipe(kp(Zz))),
              (this.isLoader = !0);
          }
          ngOnInit() {
            setTimeout(() => {
              this.isLoader = !1;
            }, 500),
              this.http
                .get("http://localhost:5000/superadmin/superAdminStatus", {
                  withCredentials: !0,
                })
                .subscribe(
                  (r) => {
                    console.log("dashboard"),
                      console.log(r),
                      (this.data = r.email),
                      this.store.dispatch(YM()),
                      Un.Emitter.emit(!0);
                  },
                  (r) => {
                    console.log("error"), localStorage.removeItem("isLoggedIN");
                  }
                ),
              localStorage.getItem("isLoggedIN")
                ? this.router.navigate(["/"])
                : this.router.navigate(["/login"]);
          }
          fullDetatils(n) {
            this.router.navigate(["full_details", n]);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(bo), _($e), _(gi), _(dr));
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-dashbord"]],
            decls: 2,
            vars: 2,
            consts: [
              ["style", "padding: 11rem;", 4, "ngIf"],
              [4, "ngIf"],
              [2, "padding", "11rem"],
              [1, "loadingspinner"],
              ["id", "square1"],
              ["id", "square2"],
              ["id", "square3"],
              ["id", "square4"],
              ["id", "square5"],
              ["class", "wrapper", 4, "ngIf"],
              [1, "wrapper"],
              ["id", "sidebar"],
              [1, "sidebar-header"],
              [1, "list-unstyled", "components"],
              [1, "active"],
              [
                "href",
                "#homeSubmenu",
                "routerLinkActive",
                "active",
                "data-toggle",
                "collapse",
                "aria-expanded",
                "false",
                1,
                "text-center",
              ],
              [
                "href",
                "#pageSubmenu",
                "routerLinkActive",
                "active",
                "data-toggle",
                "collapse",
                "aria-expanded",
                "false",
                1,
                "text-center",
              ],
              ["id", "content"],
              [1, "table"],
              ["scope", "col"],
              [4, "ngFor", "ngForOf"],
              ["scope", "row"],
              [1, "btn", "btn-dark", "align-items-center", 3, "click"],
            ],
            template: function (n, r) {
              1 & n && (L(0, Xz, 7, 0, "div", 0), L(1, t5, 3, 3, "div", 1)),
                2 & n && (P("ngIf", r.isLoader), I(1), P("ngIf", !r.isLoader));
            },
            dependencies: [_E, lr, LS, kh],
            styles: [
              '@import"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";body[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;background:#fafafa}p[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;font-size:1.1em;font-weight:300;line-height:1.7em;color:#999}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:focus{color:inherit;text-decoration:none;transition:all .3s}.navbar[_ngcontent-%COMP%]{padding:15px 10px;background:#fff;border:none;border-radius:0;margin-bottom:40px;box-shadow:1px 1px 3px #0000001a}.navbar-btn[_ngcontent-%COMP%]{box-shadow:none;outline:none!important;border:none}.line[_ngcontent-%COMP%]{width:100%;height:1px;border-bottom:1px dashed #ddd;margin:40px 0}.wrapper[_ngcontent-%COMP%]{display:flex;width:100%;align-items:stretch}#sidebar[_ngcontent-%COMP%]{min-width:250px;max-width:250px;background:#fe8523;color:#fff;transition:all .3s}#sidebar.active[_ngcontent-%COMP%]{margin-left:-250px}#sidebar[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]{padding:20px;background:#fe8523}#sidebar[_ngcontent-%COMP%]   ul.components[_ngcontent-%COMP%]{padding:20px 0;border-bottom:1px solid #fe8523}#sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;padding:10px}#sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px;font-size:1.1em;display:block}.btn[_ngcontent-%COMP%]{background:#fe8523}#sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fe8523;background:#fff}#sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], a[aria-expanded=true][_ngcontent-%COMP%]{color:#fe8523;background:#fff}a[data-toggle=collapse][_ngcontent-%COMP%]{position:relative}.dropdown-toggle[_ngcontent-%COMP%]:after{display:block;position:absolute;top:50%;right:20px;transform:translateY(-50%)}ul[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.9em!important;padding-left:30px!important;background:#fe8523}ul.CTAs[_ngcontent-%COMP%]{padding:20px}ul.CTAs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:center;font-size:.9em!important;display:block;border-radius:5px;margin-bottom:5px}a.download[_ngcontent-%COMP%]{background:#fff;color:#fe8523}a.article[_ngcontent-%COMP%], a.article[_ngcontent-%COMP%]:hover{background:#fe8523!important;color:#fe8523!important}#content[_ngcontent-%COMP%]{width:100%;padding:20px;min-height:100vh;transition:all .3s}@media (max-width: 768px){#sidebar[_ngcontent-%COMP%]{margin-left:-250px}#sidebar.active[_ngcontent-%COMP%]{margin-left:0}#sidebarCollapse[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}}.loadingspinner[_ngcontent-%COMP%]{--square: 26px;--offset: 30px;--duration: 2.4s;--delay: .2s;--timing-function: ease-in-out;--in-duration: .4s;--in-delay: .1s;--in-timing-function: ease-out;width:calc(3 * var(--offset) + var(--square));height:calc(2 * var(--offset) + var(--square));padding:0;margin:10px auto 30px;position:relative}.loadingspinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:inline-block;background:darkorange;border:none;border-radius:2px;width:var(--square);height:var(--square);position:absolute;padding:0;margin:0;font-size:6pt;color:#000}.loadingspinner[_ngcontent-%COMP%]   #square1[_ngcontent-%COMP%]{left:calc(0 * var(--offset));top:calc(0 * var(--offset));animation:_ngcontent-%COMP%_square1 var(--duration) var(--delay) var(--timing-function) infinite,squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both}.loadingspinner[_ngcontent-%COMP%]   #square2[_ngcontent-%COMP%]{left:calc(0 * var(--offset));top:calc(1 * var(--offset));animation:_ngcontent-%COMP%_square2 var(--duration) var(--delay) var(--timing-function) infinite,squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both}.loadingspinner[_ngcontent-%COMP%]   #square3[_ngcontent-%COMP%]{left:calc(1 * var(--offset));top:calc(1 * var(--offset));animation:_ngcontent-%COMP%_square3 var(--duration) var(--delay) var(--timing-function) infinite,squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both}.loadingspinner[_ngcontent-%COMP%]   #square4[_ngcontent-%COMP%]{left:calc(2 * var(--offset));top:calc(1 * var(--offset));animation:_ngcontent-%COMP%_square4 var(--duration) var(--delay) var(--timing-function) infinite,squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both}.loadingspinner[_ngcontent-%COMP%]   #square5[_ngcontent-%COMP%]{left:calc(3 * var(--offset));top:calc(1 * var(--offset));animation:_ngcontent-%COMP%_square5 var(--duration) var(--delay) var(--timing-function) infinite,squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both}@keyframes _ngcontent-%COMP%_square1{0%{left:calc(0 * var(--offset));top:calc(0 * var(--offset))}8.333%{left:calc(0 * var(--offset));top:calc(1 * var(--offset))}to{left:calc(0 * var(--offset));top:calc(1 * var(--offset))}}@keyframes _ngcontent-%COMP%_square2{0%{left:calc(0 * var(--offset));top:calc(1 * var(--offset))}8.333%{left:calc(0 * var(--offset));top:calc(2 * var(--offset))}16.67%{left:calc(1 * var(--offset));top:calc(2 * var(--offset))}25.00%{left:calc(1 * var(--offset));top:calc(1 * var(--offset))}83.33%{left:calc(1 * var(--offset));top:calc(1 * var(--offset))}91.67%{left:calc(1 * var(--offset));top:calc(0 * var(--offset))}to{left:calc(0 * var(--offset));top:calc(0 * var(--offset))}}@keyframes _ngcontent-%COMP%_square3{0%,to{left:calc(1 * var(--offset));top:calc(1 * var(--offset))}16.67%{left:calc(1 * var(--offset));top:calc(1 * var(--offset))}25.00%{left:calc(1 * var(--offset));top:calc(0 * var(--offset))}33.33%{left:calc(2 * var(--offset));top:calc(0 * var(--offset))}41.67%{left:calc(2 * var(--offset));top:calc(1 * var(--offset))}66.67%{left:calc(2 * var(--offset));top:calc(1 * var(--offset))}75.00%{left:calc(2 * var(--offset));top:calc(2 * var(--offset))}83.33%{left:calc(1 * var(--offset));top:calc(2 * var(--offset))}91.67%{left:calc(1 * var(--offset));top:calc(1 * var(--offset))}}@keyframes _ngcontent-%COMP%_square4{0%{left:calc(2 * var(--offset));top:calc(1 * var(--offset))}33.33%{left:calc(2 * var(--offset));top:calc(1 * var(--offset))}41.67%{left:calc(2 * var(--offset));top:calc(2 * var(--offset))}50.00%{left:calc(3 * var(--offset));top:calc(2 * var(--offset))}58.33%{left:calc(3 * var(--offset));top:calc(1 * var(--offset))}to{left:calc(3 * var(--offset));top:calc(1 * var(--offset))}}@keyframes _ngcontent-%COMP%_square5{0%{left:calc(3 * var(--offset));top:calc(1 * var(--offset))}50.00%{left:calc(3 * var(--offset));top:calc(1 * var(--offset))}58.33%{left:calc(3 * var(--offset));top:calc(0 * var(--offset))}66.67%{left:calc(2 * var(--offset));top:calc(0 * var(--offset))}75.00%{left:calc(2 * var(--offset));top:calc(1 * var(--offset))}to{left:calc(2 * var(--offset));top:calc(1 * var(--offset))}}@keyframes _ngcontent-%COMP%_squarefadein{0%{transform:scale(.75);opacity:0}to{transform:scale(1);opacity:1}}',
            ],
          })),
          e
        );
      })();
      function r5(e, t) {
        1 & e && (E(0, "div"), R(1, " * Please Enter your name "), D());
      }
      function i5(e, t) {
        if (
          (1 & e && (E(0, "div", 16), L(1, r5, 2, 0, "div", 17), D()), 2 & e)
        ) {
          const n = K();
          I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.name.errors.required
            );
        }
      }
      function o5(e, t) {
        1 & e &&
          (E(0, "div"), R(1, " *Please enter your place or city ! "), D());
      }
      function s5(e, t) {
        if (
          (1 & e && (E(0, "div", 16), L(1, o5, 2, 0, "div", 17), D()), 2 & e)
        ) {
          const n = K();
          I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.place.errors.required
            );
        }
      }
      function a5(e, t) {
        1 & e && (E(0, "div"), R(1, " *Please enter owner name "), D());
      }
      function l5(e, t) {
        if (
          (1 & e && (E(0, "div", 16), L(1, a5, 2, 0, "div", 17), D()), 2 & e)
        ) {
          const n = K();
          I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.owner_name.errors.required
            );
        }
      }
      function u5(e, t) {
        1 & e && (E(0, "div"), R(1, " *please enter your email id "), D());
      }
      function c5(e, t) {
        1 & e && (E(0, "div"), R(1, " *Email Should be authentiated "), D());
      }
      function d5(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 16),
            L(1, u5, 2, 0, "div", 17),
            L(2, c5, 2, 0, "div", 17),
            D()),
          2 & e)
        ) {
          const n = K();
          I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.owner_email.errors.required
            ),
            I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.owner_email.errors.email
            );
        }
      }
      function f5(e, t) {
        1 & e && (E(0, "div"), R(1, " *enter your password "), D());
      }
      function h5(e, t) {
        1 & e && (E(0, "div"), R(1, " *Password min 4 charectors "), D());
      }
      function p5(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 16),
            L(1, f5, 2, 0, "div", 17),
            L(2, h5, 2, 0, "div", 17),
            D()),
          2 & e)
        ) {
          const n = K();
          I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.password.errors.required
            ),
            I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.password.errors.minlength
            );
        }
      }
      function g5(e, t) {
        1 & e && (E(0, "div"), R(1, " *Please enter owner number "), D());
      }
      function m5(e, t) {
        1 & e && (E(0, "div"), R(1, " * This is not a valid number "), D());
      }
      function y5(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 16),
            L(1, g5, 2, 0, "div", 17),
            L(2, m5, 2, 0, "div", 17),
            D()),
          2 & e)
        ) {
          const n = K();
          I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.owner_number.errors.required
            ),
            I(1),
            P(
              "ngIf",
              n.submitted &&
                n.PartnerRegistrationForm.controls.owner_number.errors.minlength
            );
        }
      }
      const So = function (e) {
        return { "is-invalid": e };
      };
      let v5 = (() => {
        class e {
          constructor(n, r, i) {
            (this.formBuilder = n),
              (this.service = r),
              (this.route = i),
              (this.error = "");
          }
          ngOnInit() {
            this.restaurantId = this.route.queryParams.subscribe((n) => {
              (this.prtneremail = n.email),
                (this.prtnername = n.name),
                console.log(this.prtneremail),
                this.formLoaders();
            });
          }
          formLoaders() {
            (this.PartnerRegistrationForm = this.formBuilder.group({
              name: new Dt("", [ft.required]),
              place: new Dt("", [ft.required]),
              owner_name: new Dt("", [ft.required]),
              owner_email: new Dt("", [ft.required, ft.email]),
              password: new Dt("", [ft.required, ft.minLength(4)]),
              owner_number: new Dt("", [ft.required, ft.minLength(10)]),
            })),
              this.PartnerRegistrationForm.get("owner_name")?.patchValue(
                this.prtnername
              );
          }
          PartnersRegistration() {
            if (((this.submitted = !0), this.PartnerRegistrationForm.invalid))
              return;
            let n = this.PartnerRegistrationForm.getRawValue();
            console.log(n), this.service.ParnerRegistration(n);
          }
          ngOnDestroy() {
            this.queryParamsSubscription &&
              this.queryParamsSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(cc), _(gi), _(Or));
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-partner-registration"]],
            decls: 35,
            vars: 26,
            consts: [
              [1, "container", "mt-5"],
              [1, "row", "g-3", 3, "formGroup", "ngSubmit"],
              [1, "col-sm-12", "col-lg-6"],
              ["for", "inputEmail4", 1, "form-label"],
              [
                "formControlName",
                "name",
                "type",
                "text",
                "id",
                "resname",
                1,
                "form-control",
                3,
                "ngClass",
              ],
              ["class", "text-danger emailerror", 4, "ngIf"],
              ["for", "inputPassword4", 1, "form-label"],
              [
                "formControlName",
                "place",
                "type",
                "text",
                "id",
                "palce",
                1,
                "form-control",
                3,
                "ngClass",
              ],
              ["for", "inputAddress", 1, "form-label"],
              [
                "formControlName",
                "owner_name",
                "type",
                "text",
                "id",
                "owber_name",
                1,
                "form-control",
                3,
                "ngModel",
                "ngClass",
                "ngModelChange",
              ],
              ["for", "inputAddress2", 1, "form-label"],
              [
                "formControlName",
                "owner_email",
                "type",
                "email",
                "id",
                "form3Example4",
                1,
                "form-control",
                3,
                "ngClass",
              ],
              [
                "formControlName",
                "password",
                "type",
                "password",
                "id",
                "form3Example4",
                1,
                "form-control",
                3,
                "ngClass",
              ],
              [
                "formControlName",
                "owner_number",
                "type",
                "password",
                "id",
                "form3Example4",
                1,
                "form-control",
                3,
                "ngClass",
              ],
              [1, "col-6"],
              ["id", "submitBtn", "type", "submit", 1, "btn", "btn-primary"],
              [1, "text-danger", "emailerror"],
              [4, "ngIf"],
            ],
            template: function (n, r) {
              1 & n &&
                (E(0, "div", 0)(1, "form", 1),
                le("ngSubmit", function () {
                  return r.PartnersRegistration();
                }),
                E(2, "div", 2)(3, "label", 3),
                R(4, "Restaurant Name"),
                D(),
                de(5, "input", 4),
                L(6, i5, 2, 1, "div", 5),
                D(),
                E(7, "div", 2)(8, "label", 6),
                R(9, "Place"),
                D(),
                de(10, "input", 7),
                L(11, s5, 2, 1, "div", 5),
                D(),
                E(12, "div", 2)(13, "label", 8),
                R(14, "Owener Name "),
                D(),
                E(15, "input", 9),
                le("ngModelChange", function (o) {
                  return (r.prtnername = o);
                }),
                D(),
                L(16, l5, 2, 1, "div", 5),
                D(),
                E(17, "div", 2)(18, "label", 10),
                R(19, "Owener Email "),
                D(),
                de(20, "input", 11),
                L(21, d5, 3, 2, "div", 5),
                D(),
                E(22, "div", 2)(23, "label", 10),
                R(24, "Password "),
                D(),
                de(25, "input", 12),
                L(26, p5, 3, 2, "div", 5),
                D(),
                E(27, "div", 2)(28, "label", 10),
                R(29, "Owner Number "),
                D(),
                de(30, "input", 13),
                L(31, y5, 3, 2, "div", 5),
                D(),
                E(32, "div", 14)(33, "button", 15),
                R(34, " Sign in "),
                D()()()()),
                2 & n &&
                  (I(1),
                  P("formGroup", r.PartnerRegistrationForm),
                  I(4),
                  P(
                    "ngClass",
                    nr(
                      14,
                      So,
                      r.submitted &&
                        r.PartnerRegistrationForm.controls.name.errors
                    )
                  ),
                  I(1),
                  P("ngIf", r.PartnerRegistrationForm.controls.name.errors),
                  I(4),
                  P(
                    "ngClass",
                    nr(
                      16,
                      So,
                      r.submitted &&
                        r.PartnerRegistrationForm.controls.place.errors
                    )
                  ),
                  I(1),
                  P("ngIf", r.PartnerRegistrationForm.controls.place.errors),
                  I(4),
                  P("ngModel", r.prtnername)(
                    "ngClass",
                    nr(
                      18,
                      So,
                      r.submitted &&
                        r.PartnerRegistrationForm.controls.owner_name.errors
                    )
                  ),
                  I(1),
                  P(
                    "ngIf",
                    r.PartnerRegistrationForm.controls.owner_name.errors
                  ),
                  I(4),
                  P(
                    "ngClass",
                    nr(
                      20,
                      So,
                      r.submitted &&
                        r.PartnerRegistrationForm.controls.owner_email.errors
                    )
                  ),
                  I(1),
                  P(
                    "ngIf",
                    r.PartnerRegistrationForm.controls.owner_email.errors
                  ),
                  I(4),
                  P(
                    "ngClass",
                    nr(
                      22,
                      So,
                      r.submitted &&
                        r.PartnerRegistrationForm.controls.password.errors
                    )
                  ),
                  I(1),
                  P("ngIf", r.PartnerRegistrationForm.controls.password.errors),
                  I(4),
                  P(
                    "ngClass",
                    nr(
                      24,
                      So,
                      r.submitted &&
                        r.PartnerRegistrationForm.controls.owner_number.errors
                    )
                  ),
                  I(1),
                  P(
                    "ngIf",
                    r.PartnerRegistrationForm.controls.owner_number.errors
                  ));
            },
            dependencies: [Nh, lr, da, ci, ra, ia, fi, wo],
            styles: [
              ".form-outline[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{border:solid .2px rgb(243,110,8);border-radius:15px;box-shadow:none}.container[_ngcontent-%COMP%]{width:50%;background-color:#fff;padding:20px;border-radius:5px;position:absolute;left:50%;top:40%;transform:translate(-50%,-50%)}body[_ngcontent-%COMP%]{background-color:#8a2be2}.form-control[_ngcontent-%COMP%], .form-select[_ngcontent-%COMP%]{border-radius:0;border:none;border-bottom:1px solid #555}.btn-primary[_ngcontent-%COMP%]{border-radius:0;background-color:#e74c3c;border:none}@media only screen and (max-width: 768px){.container[_ngcontent-%COMP%]{width:90%;margin-top:30px;position:absolute;left:50%;top:50%;padding-bottom:40px}}",
            ],
          })),
          e
        );
      })();
      function yT(e, t, n, r, i, o, s) {
        try {
          var a = e[o](s),
            l = a.value;
        } catch (u) {
          return void n(u);
        }
        a.done ? t(l) : Promise.resolve(l).then(r, i);
      }
      function Gg(e) {
        return function () {
          var t = this,
            n = arguments;
          return new Promise(function (r, i) {
            var o = e.apply(t, n);
            function s(l) {
              yT(o, r, i, s, a, "next", l);
            }
            function a(l) {
              yT(o, r, i, s, a, "throw", l);
            }
            s(void 0);
          });
        };
      }
      let vT = (() => {
          class e {
            constructor(n) {
              this.router = n;
            }
            isSuperADminLoggedIn() {
              console.log(!!localStorage.getItem("isLoggedIN")),
                Un.Emitter.emit(!0),
                localStorage.getItem("isLoggedIN");
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w($e));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        qg = (() => {
          class e {
            constructor(n, r) {
              (this.authService = n), (this.router = r);
            }
            canActivate(n, r) {
              var i = this;
              return Gg(function* () {
                try {
                  return localStorage.getItem("isLoggedIN")
                    ? (console.log(!0), !0)
                    : (i.router.navigate(["/login"]), !1);
                } catch (o) {
                  return (
                    console.error(
                      "An error occurred during authentication:",
                      o
                    ),
                    i.router.navigate(["/"]),
                    !1
                  );
                }
              })();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(vT), w($e));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function _5(e, t) {
        if ((1 & e && (E(0, "div", 26), R(1), D()), 2 & e)) {
          const n = K().ngIf;
          I(1), qt(" ", n.name, " ");
        }
      }
      function D5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "div", 26)(1, "input", 27),
            le("ngModelChange", function (i) {
              return Tt(n), It((K().ngIf.name = i));
            }),
            D()();
        }
        if (2 & e) {
          const n = K().ngIf;
          I(1), P("ngModel", n.name);
        }
      }
      function C5(e, t) {
        if ((1 & e && (E(0, "div", 26), R(1), D()), 2 & e)) {
          const n = K().ngIf;
          I(1), qt(" ", n.place, " ");
        }
      }
      function w5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "div", 26)(1, "input", 28),
            le("ngModelChange", function (i) {
              return Tt(n), It((K().ngIf.place = i));
            }),
            D()();
        }
        if (2 & e) {
          const n = K().ngIf;
          I(1), P("ngModel", n.place);
        }
      }
      function E5(e, t) {
        if ((1 & e && (E(0, "div", 26), R(1), D()), 2 & e)) {
          const n = K().ngIf;
          I(1), qt(" ", n.owner_name, " ");
        }
      }
      function b5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "div", 26)(1, "input", 29),
            le("ngModelChange", function (i) {
              return Tt(n), It((K().ngIf.owner_name = i));
            }),
            D()();
        }
        if (2 & e) {
          const n = K().ngIf;
          I(1), P("ngModel", n.owner_name);
        }
      }
      function S5(e, t) {
        if ((1 & e && (E(0, "div", 26), R(1), D()), 2 & e)) {
          const n = K().ngIf;
          I(1), qt(" ", n.owner_number, " ");
        }
      }
      function M5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "div", 26)(1, "input", 30),
            le("ngModelChange", function (i) {
              return Tt(n), It((K().ngIf.owner_number = i));
            }),
            D()();
        }
        if (2 & e) {
          const n = K().ngIf;
          I(1), P("ngModel", n.owner_number);
        }
      }
      function T5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "button", 31),
            le("click", function () {
              return Tt(n), It((K(2).isEdit = !1));
            }),
            R(1, " Cancel "),
            D();
        }
      }
      function I5(e, t) {
        1 & e && (E(0, "button", 32), R(1, " Save "), D());
      }
      function A5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "button", 33),
            le("click", function () {
              return Tt(n), It(K(2).editRestaurant());
            }),
            R(1, " Edit "),
            D();
        }
      }
      function R5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "button", 34),
            le("click", function () {
              Tt(n);
              const i = K().ngIf;
              return It(K().listrestaurant(i._id, i.status));
            }),
            R(1, " List "),
            D();
        }
      }
      function P5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "button", 31),
            le("click", function () {
              Tt(n);
              const i = K().ngIf;
              return It(K().listrestaurant(i._id, i.status));
            }),
            R(1, " Un List "),
            D();
        }
      }
      function O5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "div")(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(
            5,
            "div",
            5
          )(6, "div", 6)(7, "div", 7),
            de(8, "img", 8),
            E(9, "div", 9)(10, "h4"),
            R(11),
            D(),
            E(12, "p", 10),
            R(13),
            D(),
            E(14, "p", 11),
            R(15, " Bay Area, San Francisco, CA "),
            D()()()()()(),
            E(16, "div", 12)(17, "div", 13)(18, "div", 6)(19, "form", 14),
            le("submit", function () {
              const o = Tt(n).ngIf;
              return It(K().saveEdit(o._id));
            }),
            E(20, "div", 15)(21, "div", 16)(22, "h6", 17),
            R(23, "Restaurant Name"),
            D()(),
            L(24, _5, 2, 1, "div", 18),
            L(25, D5, 2, 1, "div", 18),
            D(),
            de(26, "hr"),
            E(27, "div", 15)(28, "div", 16)(29, "h6", 17),
            R(30, "Place"),
            D()(),
            L(31, C5, 2, 1, "div", 18),
            L(32, w5, 2, 1, "div", 18),
            D(),
            de(33, "hr"),
            E(34, "div", 15)(35, "div", 16)(36, "h6", 17),
            R(37, "Owner Name"),
            D()(),
            L(38, E5, 2, 1, "div", 18),
            L(39, b5, 2, 1, "div", 18),
            D(),
            de(40, "hr"),
            E(41, "div", 15)(42, "div", 16)(43, "h6", 17),
            R(44, "Owner Number"),
            D()(),
            L(45, S5, 2, 1, "div", 18),
            L(46, M5, 2, 1, "div", 18),
            D(),
            de(47, "hr"),
            E(48, "div", 15)(49, "div", 19),
            L(50, T5, 2, 0, "button", 20),
            L(51, I5, 2, 0, "button", 21),
            D()()(),
            E(52, "div", 22)(53, "div", 23),
            L(54, A5, 2, 0, "button", 24),
            L(55, R5, 2, 0, "button", 25),
            L(56, P5, 2, 0, "button", 20),
            D()()()()()()()()();
        }
        if (2 & e) {
          const n = t.ngIf,
            r = K();
          I(11),
            tr(n.name),
            I(2),
            tr(n.place),
            I(6),
            P("formGroup", r.form),
            I(5),
            P("ngIf", !r.isEdit),
            I(1),
            P("ngIf", r.isEdit),
            I(6),
            P("ngIf", !r.isEdit),
            I(1),
            P("ngIf", r.isEdit),
            I(6),
            P("ngIf", !r.isEdit),
            I(1),
            P("ngIf", r.isEdit),
            I(6),
            P("ngIf", !r.isEdit),
            I(1),
            P("ngIf", r.isEdit),
            I(4),
            P("ngIf", r.isEdit),
            I(1),
            P("ngIf", r.isEdit),
            I(3),
            P("ngIf", !r.isEdit),
            I(1),
            P("ngIf", 1 == n.status && !r.isEdit),
            I(1),
            P("ngIf", 0 == n.status && !r.isEdit);
        }
      }
      let N5 = (() => {
        class e {
          constructor(n, r, i, o, s, a) {
            (this.router = n),
              (this.route = r),
              (this.http = i),
              (this.service = o),
              (this.formBuilder = s),
              (this.resDataStore = a),
              (this.resFullDetails$ = this.resDataStore.pipe(kp(Yz)));
          }
          ngOnInit() {
            console.log(this.resFullDetails$),
              (this.restaurantId = this.route.snapshot.paramMap.get("id")),
              this.resDataStore.dispatch(dc({ id: this.restaurantId })),
              this.http
                .get("http://localhost:5000/superadmin/superAdminStatus", {
                  withCredentials: !0,
                })
                .subscribe(
                  (n) => {
                    (this.isEdit = !1), Un.Emitter.emit(!0);
                  },
                  (n) => {
                    this.router.navigate(["/login"]),
                      console.log("error"),
                      localStorage.removeItem("isLoggedIN"),
                      Un.Emitter.emit(!1);
                  }
                ),
              (this.form = this.formBuilder.group({
                name: "",
                place: "",
                owner_name: "",
                owner_number: "",
              }));
          }
          listrestaurant(n, r) {
            this.service.listrestaurant(n, r);
          }
          editRestaurant() {
            this.isEdit = !0;
          }
          saveEdit(n) {
            let r = this.form.getRawValue();
            this.http
              .post(`http://localhost:5000/restaurants/save_edit/${n}`, r, {
                withCredentials: !0,
              })
              .subscribe(() => {
                this.router.navigate([this.router.url]),
                  (this.isEdit = !1),
                  this.resDataStore.dispatch(dc({ id: this.restaurantId }));
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_($e), _(Or), _(bo), _(gi), _(cc), _(dr));
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-details-restaurants"]],
            decls: 2,
            vars: 3,
            consts: [
              [4, "ngIf"],
              [1, "container"],
              [1, "main-body", "w-75"],
              [1, "row", "gutters-sm"],
              [1, "col-md-4", "mb-3"],
              [1, "card"],
              [1, "card-body"],
              [1, "d-flex", "flex-column", "align-items-center", "text-center"],
              [
                "src",
                "https://bootdey.com/img/Content/avatar/avatar7.png",
                "alt",
                "Admin",
                "width",
                "150",
                1,
                "rounded-circle",
              ],
              [1, "mt-3"],
              [1, "text-secondary", "mb-1"],
              [1, "text-muted", "font-size-sm"],
              [1, "col-md-8"],
              [1, "card", "mb-3"],
              [3, "formGroup", "submit"],
              [1, "row"],
              [1, "col-sm-3"],
              [1, "mb-0"],
              ["class", "col-sm-9 text-secondary", 4, "ngIf"],
              [1, "col-sm-12"],
              ["class", "btn btn-dark", 3, "click", 4, "ngIf"],
              ["class", "btn btn-dark", "type", "submit", 4, "ngIf"],
              [1, "row", "align-items-center"],
              [1, "col-sm-12", "align-items-center"],
              ["class", "btn btn-info ml-4", 3, "click", 4, "ngIf"],
              ["class", "btn btn-dark ml-2", 3, "click", 4, "ngIf"],
              [1, "col-sm-9", "text-secondary"],
              [
                "type",
                "text",
                "formControlName",
                "name",
                1,
                "form-control",
                "form-control-sm",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "type",
                "text",
                "formControlName",
                "place",
                1,
                "form-control",
                "form-control-sm",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "type",
                "text",
                "formControlName",
                "owner_name",
                1,
                "form-control",
                "form-control-sm",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "type",
                "text",
                "formControlName",
                "owner_number",
                1,
                "form-control",
                "form-control-sm",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [1, "btn", "btn-dark", 3, "click"],
              ["type", "submit", 1, "btn", "btn-dark"],
              [1, "btn", "btn-info", "ml-4", 3, "click"],
              [1, "btn", "btn-dark", "ml-2", 3, "click"],
            ],
            template: function (n, r) {
              1 & n && (L(0, O5, 57, 16, "div", 0), Uf(1, "async")),
                2 & n && P("ngIf", Bf(1, 1, r.resFullDetails$));
            },
            dependencies: [lr, da, ci, ra, ia, fi, wo, kh],
            styles: [
              "body[_ngcontent-%COMP%]{padding-top:50px}.jumbotron[_ngcontent-%COMP%]{background-color:#fe8523;background-size:cover;height:300px;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center}.jumbotron[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:48px;font-weight:700;margin-bottom:20px}.jumbotron[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:24px}.container[_ngcontent-%COMP%]{margin-bottom:50px}.menu-item[_ngcontent-%COMP%]{margin-bottom:20px}",
            ],
          })),
          e
        );
      })();
      class x5 extends ke {
        constructor(t = 1 / 0, n = 1 / 0, r = Cp) {
          super(),
            (this._bufferSize = t),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, t)),
            (this._windowTime = Math.max(1, n));
        }
        next(t) {
          const {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: i,
            _timestampProvider: o,
            _windowTime: s,
          } = this;
          n || (r.push(t), !i && r.push(o.now() + s)),
            this._trimBuffer(),
            super.next(t);
        }
        _subscribe(t) {
          this._throwIfClosed(), this._trimBuffer();
          const n = this._innerSubscribe(t),
            { _infiniteTimeWindow: r, _buffer: i } = this,
            o = i.slice();
          for (let s = 0; s < o.length && !t.closed; s += r ? 1 : 2)
            t.next(o[s]);
          return this._checkFinalizedStatuses(t), n;
        }
        _trimBuffer() {
          const {
              _bufferSize: t,
              _timestampProvider: n,
              _buffer: r,
              _infiniteTimeWindow: i,
            } = this,
            o = (i ? 1 : 2) * t;
          if ((t < 1 / 0 && o < r.length && r.splice(0, r.length - o), !i)) {
            const s = n.now();
            let a = 0;
            for (let l = 1; l < r.length && r[l] <= s; l += 2) a = l;
            a && r.splice(0, a + 1);
          }
        }
      }
      class F5 extends ke {
        constructor() {
          super(...arguments),
            (this._value = null),
            (this._hasValue = !1),
            (this._isComplete = !1);
        }
        _checkFinalizedStatuses(t) {
          const {
            hasError: n,
            _hasValue: r,
            _value: i,
            thrownError: o,
            isStopped: s,
            _isComplete: a,
          } = this;
          n ? t.error(o) : (s || a) && (r && t.next(i), t.complete());
        }
        next(t) {
          this.isStopped || ((this._value = t), (this._hasValue = !0));
        }
        complete() {
          const { _hasValue: t, _value: n, _isComplete: r } = this;
          r || ((this._isComplete = !0), t && super.next(n), super.complete());
        }
      }
      function _T(e) {
        return kt((t, n) => e <= n);
      }
      class k5 {
        constructor() {}
        loadScript(t, n, r, i = null) {
          if (typeof document < "u" && !document.getElementById(t)) {
            let o = document.createElement("script");
            (o.async = !0),
              (o.src = n),
              (o.onload = r),
              i || (i = document.head),
              i.appendChild(o);
          }
        }
      }
      class L5 {}
      const V5 = { oneTapEnabled: !0 };
      let pa = (() => {
          class e extends k5 {
            constructor(n, r) {
              super(),
                (this.clientId = n),
                (this.initOptions = r),
                (this.changeUser = new Se()),
                (this._socialUser = new rt(null)),
                (this._accessToken = new rt(null)),
                (this._receivedAccessToken = new Se()),
                (this.initOptions = { ...V5, ...this.initOptions }),
                this._socialUser.pipe(_T(1)).subscribe(this.changeUser),
                this._accessToken
                  .pipe(_T(1))
                  .subscribe(this._receivedAccessToken);
            }
            initialize(n) {
              return new Promise((r, i) => {
                try {
                  this.loadScript(
                    e.PROVIDER_ID,
                    "https://accounts.google.com/gsi/client",
                    () => {
                      if (
                        (google.accounts.id.initialize({
                          client_id: this.clientId,
                          auto_select: n,
                          callback: ({ credential: o }) => {
                            const s = this.createSocialUser(o);
                            this._socialUser.next(s);
                          },
                          prompt_parent_id: this.initOptions?.prompt_parent_id,
                          itp_support: this.initOptions.oneTapEnabled,
                        }),
                        this.initOptions.oneTapEnabled &&
                          this._socialUser
                            .pipe(kt((o) => null === o))
                            .subscribe(() =>
                              google.accounts.id.prompt(console.debug)
                            ),
                        this.initOptions.scopes)
                      ) {
                        const o =
                          this.initOptions.scopes instanceof Array
                            ? this.initOptions.scopes.filter((s) => s).join(" ")
                            : this.initOptions.scopes;
                        this._tokenClient =
                          google.accounts.oauth2.initTokenClient({
                            client_id: this.clientId,
                            scope: o,
                            prompt: this.initOptions.prompt,
                            callback: (s) => {
                              s.error
                                ? this._accessToken.error({
                                    code: s.error,
                                    description: s.error_description,
                                    uri: s.error_uri,
                                  })
                                : this._accessToken.next(s.access_token);
                            },
                          });
                      }
                      r();
                    }
                  );
                } catch (o) {
                  i(o);
                }
              });
            }
            getLoginStatus() {
              return new Promise((n, r) => {
                this._socialUser.value
                  ? n(this._socialUser.value)
                  : r(`No user is currently logged in with ${e.PROVIDER_ID}`);
              });
            }
            refreshToken() {
              return new Promise((n, r) => {
                google.accounts.id.revoke(this._socialUser.value.id, (i) => {
                  i.error ? r(i.error) : n(this._socialUser.value);
                });
              });
            }
            getAccessToken() {
              return new Promise((n, r) => {
                this._tokenClient
                  ? (this._tokenClient.requestAccessToken({
                      hint: this._socialUser.value?.email,
                    }),
                    this._receivedAccessToken.pipe(hr(1)).subscribe(n))
                  : r(
                      this._socialUser.value
                        ? "No token client was instantiated, you should specify some scopes."
                        : "You should be logged-in first."
                    );
              });
            }
            revokeAccessToken() {
              return new Promise((n, r) => {
                this._tokenClient
                  ? this._accessToken.value
                    ? google.accounts.oauth2.revoke(
                        this._accessToken.value,
                        () => {
                          this._accessToken.next(null), n();
                        }
                      )
                    : r("No access token to revoke")
                  : r(
                      "No token client was instantiated, you should specify some scopes."
                    );
              });
            }
            signIn() {
              return Promise.reject(
                'You should not call this method directly for Google, use "<asl-google-signin-button>" wrapper or generate the button yourself with "google.accounts.id.renderButton()" (https://developers.google.com/identity/gsi/web/guides/display-button#javascript)'
              );
            }
            signOut() {
              var n = this;
              return Gg(function* () {
                google.accounts.id.disableAutoSelect(),
                  n._socialUser.next(null);
              })();
            }
            createSocialUser(n) {
              const r = new L5();
              r.idToken = n;
              const i = this.decodeJwt(n);
              return (
                (r.id = i.sub),
                (r.name = i.name),
                (r.email = i.email),
                (r.photoUrl = i.picture),
                (r.firstName = i.given_name),
                (r.lastName = i.family_name),
                r
              );
            }
            decodeJwt(n) {
              const i = n.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
                o = decodeURIComponent(
                  window
                    .atob(i)
                    .split("")
                    .map(function (s) {
                      return (
                        "%" + ("00" + s.charCodeAt(0).toString(16)).slice(-2)
                      );
                    })
                    .join("")
                );
              return JSON.parse(o);
            }
          }
          return (e.PROVIDER_ID = "GOOGLE"), e;
        })(),
        mc = (() => {
          class e {
            get authState() {
              return this._authState.asObservable();
            }
            get initState() {
              return this._initState.asObservable();
            }
            constructor(n, r, i) {
              (this._ngZone = r),
                (this._injector = i),
                (this.providers = new Map()),
                (this.autoLogin = !1),
                (this._user = null),
                (this._authState = new x5(1)),
                (this.initialized = !1),
                (this._initState = new F5()),
                n instanceof Promise
                  ? n.then((o) => {
                      this.initialize(o);
                    })
                  : this.initialize(n);
            }
            initialize(n) {
              this.autoLogin = void 0 !== n.autoLogin && n.autoLogin;
              const { onError: r = console.error } = n;
              n.providers.forEach((i) => {
                this.providers.set(
                  i.id,
                  "prototype" in i.provider
                    ? this._injector.get(i.provider)
                    : i.provider
                );
              }),
                Promise.all(
                  Array.from(this.providers.values()).map((i) =>
                    i.initialize(this.autoLogin)
                  )
                )
                  .then(() => {
                    if (this.autoLogin) {
                      const i = [];
                      let o = !1;
                      this.providers.forEach((s, a) => {
                        const l = s.getLoginStatus();
                        i.push(l),
                          l
                            .then((u) => {
                              this.setUser(u, a), (o = !0);
                            })
                            .catch(console.debug);
                      }),
                        Promise.all(i).catch(() => {
                          o ||
                            ((this._user = null), this._authState.next(null));
                        });
                    }
                    this.providers.forEach((i, o) => {
                      L0(i.changeUser) &&
                        i.changeUser.subscribe((s) => {
                          this._ngZone.run(() => {
                            this.setUser(s, o);
                          });
                        });
                    });
                  })
                  .catch((i) => {
                    r(i);
                  })
                  .finally(() => {
                    (this.initialized = !0),
                      this._initState.next(this.initialized),
                      this._initState.complete();
                  });
            }
            getAccessToken(n) {
              var r = this;
              return Gg(function* () {
                const i = r.providers.get(n);
                if (!r.initialized) throw e.ERR_NOT_INITIALIZED;
                if (!i) throw e.ERR_LOGIN_PROVIDER_NOT_FOUND;
                if (!(i instanceof pa))
                  throw e.ERR_NOT_SUPPORTED_FOR_ACCESS_TOKEN;
                return yield i.getAccessToken();
              })();
            }
            refreshAuthToken(n) {
              return new Promise((r, i) => {
                if (this.initialized) {
                  const o = this.providers.get(n);
                  o
                    ? "function" != typeof o.refreshToken
                      ? i(e.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN)
                      : o
                          .refreshToken()
                          .then((s) => {
                            this.setUser(s, n), r();
                          })
                          .catch((s) => {
                            i(s);
                          })
                    : i(e.ERR_LOGIN_PROVIDER_NOT_FOUND);
                } else i(e.ERR_NOT_INITIALIZED);
              });
            }
            refreshAccessToken(n) {
              return new Promise((r, i) => {
                if (this.initialized)
                  if (n !== pa.PROVIDER_ID)
                    i(e.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);
                  else {
                    const o = this.providers.get(n);
                    o instanceof pa
                      ? o.revokeAccessToken().then(r).catch(i)
                      : i(e.ERR_LOGIN_PROVIDER_NOT_FOUND);
                  }
                else i(e.ERR_NOT_INITIALIZED);
              });
            }
            signIn(n, r) {
              return new Promise((i, o) => {
                if (this.initialized) {
                  let s = this.providers.get(n);
                  s
                    ? s
                        .signIn(r)
                        .then((a) => {
                          this.setUser(a, n), i(a);
                        })
                        .catch((a) => {
                          o(a);
                        })
                    : o(e.ERR_LOGIN_PROVIDER_NOT_FOUND);
                } else o(e.ERR_NOT_INITIALIZED);
              });
            }
            signOut(n = !1) {
              return new Promise((r, i) => {
                if (this.initialized)
                  if (this._user) {
                    let s = this.providers.get(this._user.provider);
                    s
                      ? s
                          .signOut(n)
                          .then(() => {
                            r(), this.setUser(null);
                          })
                          .catch((a) => {
                            i(a);
                          })
                      : i(e.ERR_LOGIN_PROVIDER_NOT_FOUND);
                  } else i(e.ERR_NOT_LOGGED_IN);
                else i(e.ERR_NOT_INITIALIZED);
              });
            }
            setUser(n, r) {
              n && r && (n.provider = r),
                (this._user = n),
                this._authState.next(n);
            }
          }
          return (
            (e.ERR_LOGIN_PROVIDER_NOT_FOUND = "Login provider not found"),
            (e.ERR_NOT_LOGGED_IN = "Not logged in"),
            (e.ERR_NOT_INITIALIZED =
              "Login providers not ready yet. Are there errors on your console?"),
            (e.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN =
              "Chosen login provider is not supported for refreshing a token"),
            (e.ERR_NOT_SUPPORTED_FOR_ACCESS_TOKEN =
              "Chosen login provider is not supported for getting an access token"),
            (e.ɵfac = function (n) {
              return new (n || e)(w("SocialAuthServiceConfig"), w(me), w(Ot));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        j5 = (() => {
          class e {
            static initialize(n) {
              return {
                ngModule: e,
                providers: [
                  mc,
                  { provide: "SocialAuthServiceConfig", useValue: n },
                ],
              };
            }
            constructor(n) {
              if (n)
                throw new Error(
                  "SocialLoginModule is already loaded. Import it in the AppModule only"
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(e, 12));
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ providers: [mc], imports: [bE] })),
            e
          );
        })(),
        U5 = (() => {
          class e {
            constructor(n, r) {
              (this.type = "icon"),
                (this.size = "medium"),
                (this.text = "signin_with"),
                (this.shape = "rectangular"),
                (this.theme = "outline"),
                (this.logo_alignment = "left"),
                (this.width = ""),
                (this.locale = ""),
                r.initState.pipe(hr(1)).subscribe(() => {
                  Promise.resolve(this.width).then((i) => {
                    i > "400" || (i < "200" && "" != i)
                      ? Promise.reject(
                          "Please note .. max-width 400 , min-width 200 (https://developers.google.com/identity/gsi/web/tools/configurator)"
                        )
                      : google.accounts.id.renderButton(n.nativeElement, {
                          type: this.type,
                          size: this.size,
                          text: this.text,
                          width: this.width,
                          shape: this.shape,
                          theme: this.theme,
                          logo_alignment: this.logo_alignment,
                          locale: this.locale,
                        });
                  });
                });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Pt), _(mc));
            }),
            (e.ɵdir = G({
              type: e,
              selectors: [["asl-google-signin-button"]],
              inputs: {
                type: "type",
                size: "size",
                text: "text",
                shape: "shape",
                theme: "theme",
                logo_alignment: "logo_alignment",
                width: "width",
                locale: "locale",
              },
            })),
            e
          );
        })(),
        B5 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      function ga(e) {
        return (ga =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(e);
      }
      function T(e, t, n) {
        return (
          (t = (function $5(e) {
            var t = (function H5(e, t) {
              if ("object" !== ga(e) || null === e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" !== ga(r)) return r;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(e, "string");
            return "symbol" === ga(t) ? t : String(t);
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      const DT = ["toast-component", ""];
      function z5(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "button", 5),
            le("click", function () {
              return Tt(n), It(K().remove());
            }),
            E(1, "span", 6),
            R(2, "\xd7"),
            D()();
        }
      }
      function G5(e, t) {
        if ((1 & e && (hs(0), R(1), ps()), 2 & e)) {
          const n = K(2);
          I(1), qt("[", n.duplicatesCount + 1, "]");
        }
      }
      function q5(e, t) {
        if (
          (1 & e && (E(0, "div"), R(1), L(2, G5, 2, 1, "ng-container", 4), D()),
          2 & e)
        ) {
          const n = K();
          er(n.options.titleClass),
            Nt("aria-label", n.title),
            I(1),
            qt(" ", n.title, " "),
            I(1),
            P("ngIf", n.duplicatesCount);
        }
      }
      function W5(e, t) {
        if ((1 & e && de(0, "div", 7), 2 & e)) {
          const n = K();
          er(n.options.messageClass), P("innerHTML", n.message, Ld);
        }
      }
      function K5(e, t) {
        if ((1 & e && (E(0, "div", 8), R(1), D()), 2 & e)) {
          const n = K();
          er(n.options.messageClass),
            Nt("aria-label", n.message),
            I(1),
            qt(" ", n.message, " ");
        }
      }
      function Q5(e, t) {
        if ((1 & e && (E(0, "div"), de(1, "div", 9), D()), 2 & e)) {
          const n = K();
          I(1), to("width", n.width + "%");
        }
      }
      class n8 {
        constructor(t, n) {
          T(this, "_attachedHost", void 0),
            T(this, "component", void 0),
            T(this, "viewContainerRef", void 0),
            T(this, "injector", void 0),
            (this.component = t),
            (this.injector = n);
        }
        attach(t, n) {
          return (this._attachedHost = t), t.attach(this, n);
        }
        detach() {
          const t = this._attachedHost;
          if (t) return (this._attachedHost = void 0), t.detach();
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(t) {
          this._attachedHost = t;
        }
      }
      class r8 {
        constructor() {
          T(this, "_attachedPortal", void 0), T(this, "_disposeFn", void 0);
        }
        attach(t, n) {
          return (this._attachedPortal = t), this.attachComponentPortal(t, n);
        }
        detach() {
          this._attachedPortal && this._attachedPortal.setAttachedHost(),
            (this._attachedPortal = void 0),
            this._disposeFn && (this._disposeFn(), (this._disposeFn = void 0));
        }
        setDisposeFn(t) {
          this._disposeFn = t;
        }
      }
      class i8 {
        constructor(t) {
          T(this, "_overlayRef", void 0),
            T(this, "componentInstance", void 0),
            T(this, "duplicatesCount", 0),
            T(this, "_afterClosed", new ke()),
            T(this, "_activate", new ke()),
            T(this, "_manualClose", new ke()),
            T(this, "_resetTimeout", new ke()),
            T(this, "_countDuplicate", new ke()),
            (this._overlayRef = t);
        }
        manualClose() {
          this._manualClose.next(), this._manualClose.complete();
        }
        manualClosed() {
          return this._manualClose.asObservable();
        }
        timeoutReset() {
          return this._resetTimeout.asObservable();
        }
        countDuplicate() {
          return this._countDuplicate.asObservable();
        }
        close() {
          this._overlayRef.detach(),
            this._afterClosed.next(),
            this._manualClose.next(),
            this._afterClosed.complete(),
            this._manualClose.complete(),
            this._activate.complete(),
            this._resetTimeout.complete(),
            this._countDuplicate.complete();
        }
        afterClosed() {
          return this._afterClosed.asObservable();
        }
        isInactive() {
          return this._activate.isStopped;
        }
        activate() {
          this._activate.next(), this._activate.complete();
        }
        afterActivate() {
          return this._activate.asObservable();
        }
        onDuplicate(t, n) {
          t && this._resetTimeout.next(),
            n && this._countDuplicate.next(++this.duplicatesCount);
        }
      }
      class yc {
        constructor(t, n, r, i, o, s) {
          T(this, "toastId", void 0),
            T(this, "config", void 0),
            T(this, "message", void 0),
            T(this, "title", void 0),
            T(this, "toastType", void 0),
            T(this, "toastRef", void 0),
            T(this, "_onTap", new ke()),
            T(this, "_onAction", new ke()),
            (this.toastId = t),
            (this.config = n),
            (this.message = r),
            (this.title = i),
            (this.toastType = o),
            (this.toastRef = s),
            this.toastRef.afterClosed().subscribe(() => {
              this._onAction.complete(), this._onTap.complete();
            });
        }
        triggerTap() {
          this._onTap.next(),
            this.config.tapToDismiss && this._onTap.complete();
        }
        onTap() {
          return this._onTap.asObservable();
        }
        triggerAction(t) {
          this._onAction.next(t);
        }
        onAction() {
          return this._onAction.asObservable();
        }
      }
      const wT = new S("ToastConfig");
      class o8 extends r8 {
        constructor(t, n, r) {
          super(),
            T(this, "_hostDomElement", void 0),
            T(this, "_componentFactoryResolver", void 0),
            T(this, "_appRef", void 0),
            (this._hostDomElement = t),
            (this._componentFactoryResolver = n),
            (this._appRef = r);
        }
        attachComponentPortal(t, n) {
          const r = this._componentFactoryResolver.resolveComponentFactory(
            t.component
          );
          let i;
          return (
            (i = r.create(t.injector)),
            this._appRef.attachView(i.hostView),
            this.setDisposeFn(() => {
              this._appRef.detachView(i.hostView), i.destroy();
            }),
            n
              ? this._hostDomElement.insertBefore(
                  this._getComponentRootNode(i),
                  this._hostDomElement.firstChild
                )
              : this._hostDomElement.appendChild(this._getComponentRootNode(i)),
            i
          );
        }
        _getComponentRootNode(t) {
          return t.hostView.rootNodes[0];
        }
      }
      let s8 = (() => {
        class e {
          constructor() {
            T(this, "_document", M(Xe)), T(this, "_containerElement", void 0);
          }
          ngOnDestroy() {
            this._containerElement &&
              this._containerElement.parentNode &&
              this._containerElement.parentNode.removeChild(
                this._containerElement
              );
          }
          getContainerElement() {
            return (
              this._containerElement || this._createContainer(),
              this._containerElement
            );
          }
          _createContainer() {
            const n = this._document.createElement("div");
            n.classList.add("overlay-container"),
              n.setAttribute("aria-live", "polite"),
              this._document.body.appendChild(n),
              (this._containerElement = n);
          }
        }
        return (
          T(e, "\u0275fac", function (n) {
            return new (n || e)();
          }),
          T(
            e,
            "\u0275prov",
            O({ token: e, factory: e.ɵfac, providedIn: "root" })
          ),
          e
        );
      })();
      class a8 {
        constructor(t) {
          T(this, "_portalHost", void 0), (this._portalHost = t);
        }
        attach(t, n = !0) {
          return this._portalHost.attach(t, n);
        }
        detach() {
          return this._portalHost.detach();
        }
      }
      let l8 = (() => {
          class e {
            constructor() {
              T(this, "_overlayContainer", M(s8)),
                T(this, "_componentFactoryResolver", M(ts)),
                T(this, "_appRef", M(or)),
                T(this, "_document", M(Xe)),
                T(this, "_paneElements", new Map());
            }
            create(n, r) {
              return this._createOverlayRef(this.getPaneElement(n, r));
            }
            getPaneElement(n = "", r) {
              return (
                this._paneElements.get(r) || this._paneElements.set(r, {}),
                this._paneElements.get(r)[n] ||
                  (this._paneElements.get(r)[n] = this._createPaneElement(
                    n,
                    r
                  )),
                this._paneElements.get(r)[n]
              );
            }
            _createPaneElement(n, r) {
              const i = this._document.createElement("div");
              return (
                (i.id = "toast-container"),
                i.classList.add(n),
                i.classList.add("toast-container"),
                r
                  ? r.getContainerElement().appendChild(i)
                  : this._overlayContainer.getContainerElement().appendChild(i),
                i
              );
            }
            _createPortalHost(n) {
              return new o8(n, this._componentFactoryResolver, this._appRef);
            }
            _createOverlayRef(n) {
              return new a8(this._createPortalHost(n));
            }
          }
          return (
            T(e, "\u0275fac", function (n) {
              return new (n || e)();
            }),
            T(
              e,
              "\u0275prov",
              O({ token: e, factory: e.ɵfac, providedIn: "root" })
            ),
            e
          );
        })(),
        Wg = (() => {
          class e {
            constructor(n, r, i, o, s) {
              T(this, "overlay", void 0),
                T(this, "_injector", void 0),
                T(this, "sanitizer", void 0),
                T(this, "ngZone", void 0),
                T(this, "toastrConfig", void 0),
                T(this, "currentlyActive", 0),
                T(this, "toasts", []),
                T(this, "overlayContainer", void 0),
                T(this, "previousToastMessage", void 0),
                T(this, "index", 0),
                (this.overlay = r),
                (this._injector = i),
                (this.sanitizer = o),
                (this.ngZone = s),
                (this.toastrConfig = { ...n.default, ...n.config }),
                n.config.iconClasses &&
                  (this.toastrConfig.iconClasses = {
                    ...n.default.iconClasses,
                    ...n.config.iconClasses,
                  });
            }
            show(n, r, i = {}, o = "") {
              return this._preBuildNotification(o, n, r, this.applyConfig(i));
            }
            success(n, r, i = {}) {
              return this._preBuildNotification(
                this.toastrConfig.iconClasses.success || "",
                n,
                r,
                this.applyConfig(i)
              );
            }
            error(n, r, i = {}) {
              return this._preBuildNotification(
                this.toastrConfig.iconClasses.error || "",
                n,
                r,
                this.applyConfig(i)
              );
            }
            info(n, r, i = {}) {
              return this._preBuildNotification(
                this.toastrConfig.iconClasses.info || "",
                n,
                r,
                this.applyConfig(i)
              );
            }
            warning(n, r, i = {}) {
              return this._preBuildNotification(
                this.toastrConfig.iconClasses.warning || "",
                n,
                r,
                this.applyConfig(i)
              );
            }
            clear(n) {
              for (const r of this.toasts)
                if (void 0 !== n) {
                  if (r.toastId === n) return void r.toastRef.manualClose();
                } else r.toastRef.manualClose();
            }
            remove(n) {
              const r = this._findToast(n);
              if (
                !r ||
                (r.activeToast.toastRef.close(),
                this.toasts.splice(r.index, 1),
                (this.currentlyActive = this.currentlyActive - 1),
                !this.toastrConfig.maxOpened || !this.toasts.length)
              )
                return !1;
              if (
                this.currentlyActive < this.toastrConfig.maxOpened &&
                this.toasts[this.currentlyActive]
              ) {
                const i = this.toasts[this.currentlyActive].toastRef;
                i.isInactive() ||
                  ((this.currentlyActive = this.currentlyActive + 1),
                  i.activate());
              }
              return !0;
            }
            findDuplicate(n = "", r = "", i, o) {
              const { includeTitleDuplicates: s } = this.toastrConfig;
              for (const a of this.toasts)
                if ((!s || (s && a.title === n)) && a.message === r)
                  return a.toastRef.onDuplicate(i, o), a;
              return null;
            }
            applyConfig(n = {}) {
              return { ...this.toastrConfig, ...n };
            }
            _findToast(n) {
              for (let r = 0; r < this.toasts.length; r++)
                if (this.toasts[r].toastId === n)
                  return { index: r, activeToast: this.toasts[r] };
              return null;
            }
            _preBuildNotification(n, r, i, o) {
              return o.onActivateTick
                ? this.ngZone.run(() => this._buildNotification(n, r, i, o))
                : this._buildNotification(n, r, i, o);
            }
            _buildNotification(n, r, i, o) {
              if (!o.toastComponent) throw new Error("toastComponent required");
              const s = this.findDuplicate(
                i,
                r,
                this.toastrConfig.resetTimeoutOnDuplicate && o.timeOut > 0,
                this.toastrConfig.countDuplicates
              );
              if (
                ((this.toastrConfig.includeTitleDuplicates && i) || r) &&
                this.toastrConfig.preventDuplicates &&
                null !== s
              )
                return s;
              this.previousToastMessage = r;
              let a = !1;
              this.toastrConfig.maxOpened &&
                this.currentlyActive >= this.toastrConfig.maxOpened &&
                ((a = !0),
                this.toastrConfig.autoDismiss &&
                  this.clear(this.toasts[0].toastId));
              const l = this.overlay.create(
                o.positionClass,
                this.overlayContainer
              );
              this.index = this.index + 1;
              let u = r;
              r && o.enableHtml && (u = this.sanitizer.sanitize(_e.HTML, r));
              const c = new i8(l),
                d = new yc(this.index, o, u, i, n, c),
                h = Ot.create({
                  providers: [{ provide: yc, useValue: d }],
                  parent: this._injector,
                }),
                p = new n8(o.toastComponent, h),
                g = l.attach(p, o.newestOnTop);
              c.componentInstance = g.instance;
              const m = {
                toastId: this.index,
                title: i || "",
                message: r || "",
                toastRef: c,
                onShown: c.afterActivate(),
                onHidden: c.afterClosed(),
                onTap: d.onTap(),
                onAction: d.onAction(),
                portal: g,
              };
              return (
                a ||
                  ((this.currentlyActive = this.currentlyActive + 1),
                  setTimeout(() => {
                    m.toastRef.activate();
                  })),
                this.toasts.push(m),
                m
              );
            }
          }
          return (
            T(e, "\u0275fac", function (n) {
              return new (n || e)(w(wT), w(l8), w(Ot), w(QE), w(me));
            }),
            T(
              e,
              "\u0275prov",
              O({ token: e, factory: e.ɵfac, providedIn: "root" })
            ),
            e
          );
        })();
      const u8 = {
          maxOpened: 0,
          autoDismiss: !1,
          newestOnTop: !0,
          preventDuplicates: !1,
          countDuplicates: !1,
          resetTimeoutOnDuplicate: !1,
          includeTitleDuplicates: !1,
          iconClasses: {
            error: "toast-error",
            info: "toast-info",
            success: "toast-success",
            warning: "toast-warning",
          },
          closeButton: !1,
          disableTimeOut: !1,
          timeOut: 5e3,
          extendedTimeOut: 1e3,
          enableHtml: !1,
          progressBar: !1,
          toastClass: "ngx-toastr",
          positionClass: "toast-top-right",
          titleClass: "toast-title",
          messageClass: "toast-message",
          easing: "ease-in",
          easeTime: 300,
          tapToDismiss: !0,
          onActivateTick: !1,
          progressAnimation: "decreasing",
          toastComponent: (() => {
            class e {
              get displayStyle() {
                if ("inactive" === this.state.value) return "none";
              }
              constructor(n, r, i) {
                T(this, "toastrService", void 0),
                  T(this, "toastPackage", void 0),
                  T(this, "ngZone", void 0),
                  T(this, "message", void 0),
                  T(this, "title", void 0),
                  T(this, "options", void 0),
                  T(this, "duplicatesCount", void 0),
                  T(this, "originalTimeout", void 0),
                  T(this, "width", -1),
                  T(this, "toastClasses", ""),
                  T(this, "state", void 0),
                  T(this, "timeout", void 0),
                  T(this, "intervalId", void 0),
                  T(this, "hideTime", void 0),
                  T(this, "sub", void 0),
                  T(this, "sub1", void 0),
                  T(this, "sub2", void 0),
                  T(this, "sub3", void 0),
                  (this.toastrService = n),
                  (this.toastPackage = r),
                  (this.ngZone = i),
                  (this.message = r.message),
                  (this.title = r.title),
                  (this.options = r.config),
                  (this.originalTimeout = r.config.timeOut),
                  (this.toastClasses = `${r.toastType} ${r.config.toastClass}`),
                  (this.sub = r.toastRef.afterActivate().subscribe(() => {
                    this.activateToast();
                  })),
                  (this.sub1 = r.toastRef.manualClosed().subscribe(() => {
                    this.remove();
                  })),
                  (this.sub2 = r.toastRef.timeoutReset().subscribe(() => {
                    this.resetTimeout();
                  })),
                  (this.sub3 = r.toastRef.countDuplicate().subscribe((o) => {
                    this.duplicatesCount = o;
                  })),
                  (this.state = {
                    value: "inactive",
                    params: {
                      easeTime: this.toastPackage.config.easeTime,
                      easing: "ease-in",
                    },
                  });
              }
              ngOnDestroy() {
                this.sub.unsubscribe(),
                  this.sub1.unsubscribe(),
                  this.sub2.unsubscribe(),
                  this.sub3.unsubscribe(),
                  clearInterval(this.intervalId),
                  clearTimeout(this.timeout);
              }
              activateToast() {
                (this.state = { ...this.state, value: "active" }),
                  !0 !== this.options.disableTimeOut &&
                    "timeOut" !== this.options.disableTimeOut &&
                    this.options.timeOut &&
                    (this.outsideTimeout(
                      () => this.remove(),
                      this.options.timeOut
                    ),
                    (this.hideTime =
                      new Date().getTime() + this.options.timeOut),
                    this.options.progressBar &&
                      this.outsideInterval(() => this.updateProgress(), 10));
              }
              updateProgress() {
                if (
                  0 === this.width ||
                  100 === this.width ||
                  !this.options.timeOut
                )
                  return;
                const n = new Date().getTime();
                (this.width =
                  ((this.hideTime - n) / this.options.timeOut) * 100),
                  "increasing" === this.options.progressAnimation &&
                    (this.width = 100 - this.width),
                  this.width <= 0 && (this.width = 0),
                  this.width >= 100 && (this.width = 100);
              }
              resetTimeout() {
                clearTimeout(this.timeout),
                  clearInterval(this.intervalId),
                  (this.state = { ...this.state, value: "active" }),
                  this.outsideTimeout(
                    () => this.remove(),
                    this.originalTimeout
                  ),
                  (this.options.timeOut = this.originalTimeout),
                  (this.hideTime =
                    new Date().getTime() + (this.options.timeOut || 0)),
                  (this.width = -1),
                  this.options.progressBar &&
                    this.outsideInterval(() => this.updateProgress(), 10);
              }
              remove() {
                "removed" !== this.state.value &&
                  (clearTimeout(this.timeout),
                  (this.state = { ...this.state, value: "removed" }),
                  this.outsideTimeout(
                    () => this.toastrService.remove(this.toastPackage.toastId),
                    +this.toastPackage.config.easeTime
                  ));
              }
              tapToast() {
                "removed" !== this.state.value &&
                  (this.toastPackage.triggerTap(),
                  this.options.tapToDismiss && this.remove());
              }
              stickAround() {
                "removed" !== this.state.value &&
                  "extendedTimeOut" !== this.options.disableTimeOut &&
                  (clearTimeout(this.timeout),
                  (this.options.timeOut = 0),
                  (this.hideTime = 0),
                  clearInterval(this.intervalId),
                  (this.width = 0));
              }
              delayedHideToast() {
                !0 === this.options.disableTimeOut ||
                  "extendedTimeOut" === this.options.disableTimeOut ||
                  0 === this.options.extendedTimeOut ||
                  "removed" === this.state.value ||
                  (this.outsideTimeout(
                    () => this.remove(),
                    this.options.extendedTimeOut
                  ),
                  (this.options.timeOut = this.options.extendedTimeOut),
                  (this.hideTime =
                    new Date().getTime() + (this.options.timeOut || 0)),
                  (this.width = -1),
                  this.options.progressBar &&
                    this.outsideInterval(() => this.updateProgress(), 10));
              }
              outsideTimeout(n, r) {
                this.ngZone
                  ? this.ngZone.runOutsideAngular(
                      () =>
                        (this.timeout = setTimeout(
                          () => this.runInsideAngular(n),
                          r
                        ))
                    )
                  : (this.timeout = setTimeout(() => n(), r));
              }
              outsideInterval(n, r) {
                this.ngZone
                  ? this.ngZone.runOutsideAngular(
                      () =>
                        (this.intervalId = setInterval(
                          () => this.runInsideAngular(n),
                          r
                        ))
                    )
                  : (this.intervalId = setInterval(() => n(), r));
              }
              runInsideAngular(n) {
                this.ngZone ? this.ngZone.run(() => n()) : n();
              }
            }
            return (
              T(e, "\u0275fac", function (n) {
                return new (n || e)(_(Wg), _(yc), _(me));
              }),
              T(
                e,
                "\u0275cmp",
                un({
                  type: e,
                  selectors: [["", "toast-component", ""]],
                  hostVars: 5,
                  hostBindings: function (n, r) {
                    1 & n &&
                      le("click", function () {
                        return r.tapToast();
                      })("mouseenter", function () {
                        return r.stickAround();
                      })("mouseleave", function () {
                        return r.delayedHideToast();
                      }),
                      2 & n &&
                        (Af("@flyInOut", r.state),
                        er(r.toastClasses),
                        to("display", r.displayStyle));
                  },
                  standalone: !0,
                  features: [Hl],
                  attrs: DT,
                  decls: 5,
                  vars: 5,
                  consts: [
                    [
                      "type",
                      "button",
                      "class",
                      "toast-close-button",
                      "aria-label",
                      "Close",
                      3,
                      "click",
                      4,
                      "ngIf",
                    ],
                    [3, "class", 4, "ngIf"],
                    ["role", "alert", 3, "class", "innerHTML", 4, "ngIf"],
                    ["role", "alert", 3, "class", 4, "ngIf"],
                    [4, "ngIf"],
                    [
                      "type",
                      "button",
                      "aria-label",
                      "Close",
                      1,
                      "toast-close-button",
                      3,
                      "click",
                    ],
                    ["aria-hidden", "true"],
                    ["role", "alert", 3, "innerHTML"],
                    ["role", "alert"],
                    [1, "toast-progress"],
                  ],
                  template: function (n, r) {
                    1 & n &&
                      (L(0, z5, 3, 0, "button", 0),
                      L(1, q5, 3, 5, "div", 1),
                      L(2, W5, 1, 3, "div", 2),
                      L(3, K5, 2, 4, "div", 3),
                      L(4, Q5, 2, 2, "div", 4)),
                      2 & n &&
                        (P("ngIf", r.options.closeButton),
                        I(1),
                        P("ngIf", r.title),
                        I(1),
                        P("ngIf", r.message && r.options.enableHtml),
                        I(1),
                        P("ngIf", r.message && !r.options.enableHtml),
                        I(1),
                        P("ngIf", r.options.progressBar));
                  },
                  dependencies: [lr],
                  encapsulation: 2,
                  data: {
                    animation: [
                      f2("flyInOut", [
                        Zh("inactive", Rs({ opacity: 0 })),
                        Zh("active", Rs({ opacity: 1 })),
                        Zh("removed", Rs({ opacity: 0 })),
                        tb(
                          "inactive => active",
                          JE("{{ easeTime }}ms {{ easing }}")
                        ),
                        tb(
                          "active => removed",
                          JE("{{ easeTime }}ms {{ easing }}")
                        ),
                      ]),
                    ],
                  },
                })
              ),
              e
            );
          })(),
        },
        c8 = (e = {}) =>
          pl([{ provide: wT, useValue: { default: u8, config: e } }]);
      let d8 = (() => {
        class e {
          static forRoot(n = {}) {
            return { ngModule: e, providers: [c8(n)] };
          }
        }
        return (
          T(e, "\u0275fac", function (n) {
            return new (n || e)();
          }),
          T(e, "\u0275mod", xe({ type: e })),
          T(e, "\u0275inj", Ae({})),
          e
        );
      })();
      function f8(e, t) {
        1 & e && (E(0, "div", 27), R(1, " *UserName is requreid "), D());
      }
      function h8(e, t) {
        if (
          (1 & e && (E(0, "div", 25), L(1, f8, 2, 0, "div", 26), D()), 2 & e)
        ) {
          const n = K();
          I(1), P("ngIf", n.submitted && n.Form.controls.name.errors.required);
        }
      }
      function p8(e, t) {
        1 & e && (E(0, "div"), R(1, " *Enter Your Email "), D());
      }
      function g8(e, t) {
        1 & e && (E(0, "div"), R(1, " *Email shoud be proper format "), D());
      }
      function m8(e, t) {
        if (
          (1 & e &&
            (E(0, "div", 25),
            L(1, p8, 2, 0, "div", 28),
            L(2, g8, 2, 0, "div", 28),
            D()),
          2 & e)
        ) {
          const n = K();
          I(1),
            P("ngIf", n.submitted && n.Form.controls.email.errors.required),
            I(1),
            P("ngIf", n.submitted && n.Form.controls.email.errors.email);
        }
      }
      const ET = function (e) {
          return { "is-invalid": e };
        },
        y8 = [
          { path: "", component: n5, canActivate: [qg] },
          { path: "login", component: Qz },
          { path: "partner", component: v5 },
          { path: "full_details/:id", component: N5, canActivate: [qg] },
          {
            path: "initaillogin",
            component: (() => {
              class e {
                constructor(n, r, i, o, s, a) {
                  (this.authService = n),
                    (this.router = r),
                    (this.http = i),
                    (this.FormBuilder = o),
                    (this.AdminService = s),
                    (this.toastr = a);
                }
                ngOnInit() {
                  this.authService.authState.subscribe((n) => {
                    (this.user = n),
                      console.log(n),
                      this.user && this.initailLoginWithGoogle(n);
                  }),
                    (this.Form = this.FormBuilder.group({
                      name: new Dt("", [ft.required]),
                      email: new Dt("", [
                        ft.required,
                        ft.pattern("^[a-zA-Z]+$"),
                      ]),
                    }));
                }
                initailLoginWithGoogle(n) {
                  if (n) {
                    console.log(n.email);
                    let r = { email: n.email, name: n.name };
                    this.router.navigate(["/partner"], {
                      queryParams: { email: r.email, usernamae: r.name },
                    });
                  }
                  this.loggedIn = null != this.user;
                }
                InitailLogin() {
                  if (((this.submitted = !0), this.Form.invalid)) return;
                  let n = this.Form.getRawValue();
                  this.AdminService.InitailLogin(n).subscribe(
                    (r) => {
                      this.router.navigate(["/partner"]),
                        this.toastr.success("Account Created Successfully");
                    },
                    (r) => {
                      this.toastr.error(r.error.message);
                    }
                  );
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(_(mc), _($e), _(bo), _(cc), _(gi), _(Wg));
                }),
                (e.ɵcmp = un({
                  type: e,
                  selectors: [["app-initial-register-page"]],
                  decls: 41,
                  vars: 9,
                  consts: [
                    [1, "container"],
                    [1, "forms-container"],
                    [1, "signin-signup"],
                    [1, "sign-in-form", 3, "formGroup", "ngSubmit"],
                    [1, "title"],
                    [1, "input-field", "mb-3"],
                    [1, "fas", "fa-envelope"],
                    [
                      "type",
                      "text",
                      "placeholder",
                      "Name",
                      "formControlName",
                      "name",
                      3,
                      "ngClass",
                    ],
                    [1, "href"],
                    ["class", "text-danger emailerror", 4, "ngIf"],
                    [1, "fas", "fa-lock"],
                    [
                      "type",
                      "email",
                      "placeholder",
                      "Email",
                      "formControlName",
                      "email",
                      3,
                      "ngClass",
                    ],
                    ["type", "submit", "value", "Login ", 1, "btn", "solid"],
                    [1, "social-text"],
                    [1, "social-media"],
                    ["href", "#", 1, "social-icon"],
                    ["name", "Google Signup", "type", "icon", "size", "medium"],
                    [1, "panels-container"],
                    [1, "panel", "left-panel"],
                    [1, "content"],
                    ["id", "sign-up-btn", 1, "btn", "transparent"],
                    [
                      "src",
                      "https://raw.githubusercontent.com/sooleymanli/Login-Register-Form-Responsive/88389493c1cf548869e261f58014b343eb00ec36/img/login.svg",
                      "alt",
                      "Register",
                      1,
                      "image",
                    ],
                    [1, "panel", "right-panel"],
                    ["id", "sign-in-btn", 1, "btn", "transparent"],
                    [
                      "src",
                      "https://raw.githubusercontent.com/sooleymanli/Login-Register-Form-Responsive/88389493c1cf548869e261f58014b343eb00ec36/img/login.svg",
                      "alt",
                      "Login",
                      1,
                      "image",
                    ],
                    [1, "text-danger", "emailerror"],
                    ["class", "text-center", 4, "ngIf"],
                    [1, "text-center"],
                    [4, "ngIf"],
                  ],
                  template: function (n, r) {
                    1 & n &&
                      (E(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "form", 3),
                      le("ngSubmit", function () {
                        return r.InitailLogin();
                      }),
                      E(4, "h2", 4),
                      R(5, "Login Now !!"),
                      D(),
                      E(6, "div", 5),
                      de(7, "i", 6)(8, "input", 7),
                      D(),
                      E(9, "a", 8),
                      L(10, h8, 2, 1, "div", 9),
                      D(),
                      E(11, "div", 5),
                      de(12, "i", 10)(13, "input", 11),
                      D(),
                      E(14, "a", 8),
                      L(15, m8, 3, 2, "div", 9),
                      D(),
                      de(16, "input", 12),
                      E(17, "p", 13),
                      R(18, "Welcome to Turfyo"),
                      D(),
                      E(19, "div", 14)(20, "a", 15),
                      de(21, "asl-google-signin-button", 16),
                      D()()()()(),
                      E(22, "div", 17)(23, "div", 18)(24, "div", 19)(25, "h3"),
                      R(26, "Hesab\u0131n\u0131z yoxdur?"),
                      D(),
                      E(27, "p"),
                      R(
                        28,
                        " Qeydiyyatdan ke\xe7dikd\u0259n sonra ma\u011fazam\u0131z\u0131n bir \xe7ox xidm\u0259tl\u0259rind\u0259n yararlana bil\u0259rsiniz.. "
                      ),
                      D(),
                      E(29, "button", 20),
                      R(30, " Qeydiyyatdan ke\xe7 "),
                      D()(),
                      de(31, "img", 21),
                      D(),
                      E(32, "div", 22)(33, "div", 19)(34, "h3"),
                      R(35, "Hesab\u0131n\u0131z var?"),
                      D(),
                      E(36, "p"),
                      R(
                        37,
                        " Ma\u011fazam\u0131zdak\u0131 m\u0259hsullardan sifari\u015f verm\u0259k \xfc\xe7\xfcn daxil olma\u011f\u0131n\u0131z \u015f\u0259rtdir. Daxil olma\u011fa t\u0259l\u0259sin.. "
                      ),
                      D(),
                      E(38, "button", 23),
                      R(39, "Daxil ol"),
                      D()(),
                      de(40, "img", 24),
                      D()()()),
                      2 & n &&
                        (I(3),
                        P("formGroup", r.Form),
                        I(5),
                        P(
                          "ngClass",
                          nr(5, ET, r.submitted && r.Form.controls.name.errors)
                        ),
                        I(2),
                        P("ngIf", r.submitted && r.Form.controls.name.errors),
                        I(3),
                        P(
                          "ngClass",
                          nr(7, ET, r.submitted && r.Form.controls.email.errors)
                        ),
                        I(2),
                        P("ngIf", r.Form.controls.email.errors));
                  },
                  dependencies: [Nh, lr, da, ci, ra, ia, fi, wo, U5],
                  styles: [
                    '@import"https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap";@import"https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap";.input-field[_ngcontent-%COMP%]{max-width:380px;width:100%;background-color:#f0f0f0;margin:10px 0;height:55px;border-radius:55px;display:grid;grid-template-columns:15% 85%;padding:0 .4rem;position:relative;border:none}.input-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{background:none;outline:none;border:none;line-height:1;font-weight:600;font-size:1.1rem;color:#333;padding-left:.4rem;width:100%;height:100%}.input-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder{color:#aaa;font-weight:500}.car-select[_ngcontent-%COMP%]{width:100%;height:100%;font-size:16px;border:1px solid #ccc;border-radius:55px;padding:5px;background-color:#fff}.car-select[_ngcontent-%COMP%]:hover{border-color:#ff8b1eb9}.car-select[_ngcontent-%COMP%]:focus{outline:none;border-color:#ff8b1e;box-shadow:0 0 5px #ff8b1e}.car-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{font-size:14px}.car-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]:hover{background-color:#ff8b1e;color:#000}.car-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]:checked{background-color:#ff8b1e;color:#fff}*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}body[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}.container[_ngcontent-%COMP%]{position:relative;width:100%;background-color:#fff;min-height:100vh;overflow:hidden}.forms-container[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;top:0;left:0}.signin-signup[_ngcontent-%COMP%]{position:absolute;top:50%;transform:translate(-50%,-50%);left:75%;width:50%;transition:1s .7s ease-in-out;display:grid;grid-template-columns:1fr;z-index:5}form[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;padding:0rem 5rem;transition:all .2s .7s;overflow:hidden;grid-column:1 / 2;grid-row:1 / 2}form.sign-up-form[_ngcontent-%COMP%]{opacity:0;z-index:1}form.sign-in-form[_ngcontent-%COMP%]{z-index:2}.title[_ngcontent-%COMP%]{font-size:2.2rem;color:#444;margin-bottom:10px}.sign-up-form[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%]{max-width:380px;width:100%;background-color:#f0f0f0;margin:7px 0;height:45px;border-radius:55px;display:grid;grid-template-columns:15% 85%;padding:0 .4rem;position:relative}.sign-up-form[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{text-align:center;line-height:45px;color:#acacac;transition:.5s;font-size:1.1rem}.input-field[_ngcontent-%COMP%]{max-width:380px;box-shadow:1px 1px 8px #ff9919;width:100%;background-color:#fff;margin:10px 0;height:55px;border-radius:55px;display:grid;grid-template-columns:15% 85%;padding:0 .4rem;position:relative}.input-field[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{text-align:center;line-height:55px;color:#acacac;transition:.5s;font-size:1.1rem}.input-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:none;outline:none;border:none;line-height:1;font-weight:600;font-size:1.1rem;color:#333}.input-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#aaa;font-weight:500}.social-text[_ngcontent-%COMP%]{padding:.7rem 0;font-size:1rem;font-family:Poppins,sans-serif}.rules-text[_ngcontent-%COMP%]{padding:.7rem 0;font-size:1rem;font-family:Roboto,sans-serif}.social-media[_ngcontent-%COMP%]{display:flex;justify-content:center}.social-icon[_ngcontent-%COMP%]{height:46px;width:46px;display:flex;justify-content:center;align-items:center;margin:0 .45rem;color:#fd661b;border-radius:50%;border:1px solid #fd661b;text-decoration:none;font-size:1.1rem;transition:.3s}.social-icon[_ngcontent-%COMP%]:hover{color:#fff;border-color:#cc1e1e;background-color:#fd661b}.btn[_ngcontent-%COMP%]{width:180px;background-color:#fd661b;border:none;outline:none;height:49px;border-radius:49px;color:#fff;text-transform:uppercase;font-weight:600;margin:10px 0;cursor:pointer;transition:.5s;font-family:Poppins,sans-serif}.btn[_ngcontent-%COMP%]:hover{background-color:#e96625}.panels-container[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%;top:0;left:0;display:grid;grid-template-columns:repeat(2,1fr)}.container[_ngcontent-%COMP%]:before{content:"";position:absolute;height:2000px;width:2000px;top:-10%;right:48%;transform:translateY(-50%);background-image:linear-gradient(-45deg,#fd661b 0%,#fd661b 100%);transition:1.8s ease-in-out;border-radius:50%;z-index:6}.image[_ngcontent-%COMP%]{width:80%;transition:transform 1.1s ease-in-out;transition-delay:.4s}.image-avatar[_ngcontent-%COMP%]{width:30%;transition:transform 1.1s ease-in-out;transition-delay:.4s}.panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-end;justify-content:space-around;text-align:center;z-index:6}.left-panel[_ngcontent-%COMP%]{pointer-events:all;padding:3rem 17% 2rem 12%}.right-panel[_ngcontent-%COMP%]{pointer-events:none;padding:3rem 12% 2rem 17%}.panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{color:#fff;transition:transform .9s ease-in-out;transition-delay:.6s}.panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-weight:600;line-height:1;font-size:1.5rem}.panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.95rem;padding:.7rem 0}.btn.transparent[_ngcontent-%COMP%]{margin:0;background:none;border:2px solid #fff;width:170px;height:41px;font-weight:600;font-size:.8rem;font-family:Poppins,sans-serif}.btn.transparent[_ngcontent-%COMP%]:hover{background-color:#fff;border:2px solid #fff;color:#cc1e1e;width:170px;height:41px;font-weight:600;font-size:.8rem;transition:00.5s ease-in-out}.href[_ngcontent-%COMP%]{color:#cc1e1e;font-family:Poppins,sans-serif;text-decoration:none;color:#000}.href[_ngcontent-%COMP%]:hover{font-family:Poppins,sans-serif;text-decoration:none;transition:00.5s ease-in-out;color:#cc1e1e}.right-panel[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%], .right-panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{transform:translate(800px)}.container.sign-up-mode[_ngcontent-%COMP%]:before{transform:translate(100%,-50%);right:52%}.container.sign-up-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%], .container.sign-up-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{transform:translate(-800px)}.container.sign-up-mode[_ngcontent-%COMP%]   .signin-signup[_ngcontent-%COMP%]{left:25%}.container.sign-up-mode[_ngcontent-%COMP%]   form.sign-up-form[_ngcontent-%COMP%]{opacity:1;z-index:2}.container.sign-up-mode[_ngcontent-%COMP%]   form.sign-in-form[_ngcontent-%COMP%]{opacity:0;z-index:1}.container.sign-up-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%], .container.sign-up-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{transform:translate(0)}.container.sign-up-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%]{pointer-events:none}.container.sign-up-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%]{pointer-events:all}@media (max-width: 870px){.container[_ngcontent-%COMP%]{min-height:800px;height:100vh}.signin-signup[_ngcontent-%COMP%]{width:100%;top:95%;transform:translate(-50%,-100%);transition:1s .8s ease-in-out}.signin-signup[_ngcontent-%COMP%], .container.sign-up-mode[_ngcontent-%COMP%]   .signin-signup[_ngcontent-%COMP%]{left:50%}.panels-container[_ngcontent-%COMP%]{grid-template-columns:1fr;grid-template-rows:1fr 2fr 1fr}.panel[_ngcontent-%COMP%]{flex-direction:row;justify-content:space-around;align-items:center;padding:2.5rem 8%;grid-column:1 / 2}.right-panel[_ngcontent-%COMP%]{grid-row:3 / 4}.left-panel[_ngcontent-%COMP%]{grid-row:1 / 2}.image[_ngcontent-%COMP%]{width:100%;transition:transform .9s ease-in-out;transition-delay:.6s}.panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-right:15%;transition:transform .9s ease-in-out;transition-delay:.8s}.panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.2rem}.panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.7rem;padding:.5rem 0}.btn.transparent[_ngcontent-%COMP%]{width:140px;height:35px;font-size:.7rem;font-family:Poppins,sans-serif}.container[_ngcontent-%COMP%]:before{width:1500px;height:1500px;transform:translate(-50%);left:30%;bottom:68%;right:initial;top:initial;transition:2s ease-in-out}.container.sign-up-mode[_ngcontent-%COMP%]:before{transform:translate(-50%,100%);bottom:32%;right:initial}.container.sign-up-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%], .container.sign-up-mode[_ngcontent-%COMP%]   .left-panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{transform:translateY(-300px)}.container.sign-up-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%], .container.sign-up-mode[_ngcontent-%COMP%]   .right-panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{transform:translateY(0)}.right-panel[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%], .right-panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{transform:translateY(300px)}.container.sign-up-mode[_ngcontent-%COMP%]   .signin-signup[_ngcontent-%COMP%]{top:5%;transform:translate(-50%)}}@media (max-width: 570px){form[_ngcontent-%COMP%]{padding:0 1.5rem}.image[_ngcontent-%COMP%]{display:none}.panel[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:.5rem 1rem}.container[_ngcontent-%COMP%]{padding:1.5rem}.container[_ngcontent-%COMP%]:before{bottom:72%;left:50%}.container.sign-up-mode[_ngcontent-%COMP%]:before{bottom:28%;left:50%}}',
                  ],
                })),
                e
              );
            })(),
          },
          { path: "**", redirectTo: "/login" },
        ];
      let v8 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({ imports: [GS.forRoot(y8), GS] })),
          e
        );
      })();
      function _8(e, t) {
        1 & e &&
          (E(0, "ul", 6)(1, "li", 9)(2, "a", 10),
          R(3, "Login"),
          D()(),
          E(4, "li", 11)(5, "a", 12),
          R(6, "Partner"),
          D()()());
      }
      function D8(e, t) {
        if (1 & e) {
          const n = xt();
          E(0, "a", 13),
            le("click", function () {
              return Tt(n), It(K().superADminLogout());
            }),
            R(1, "Logout"),
            D();
        }
      }
      let C8 = (() => {
          class e {
            constructor(n, r) {
              (this.http = n), (this.router = r), (this.athendication = !1);
            }
            ngOnInit() {
              Un.Emitter.subscribe((n) => {
                console.log(this.athendication),
                  console.log("emit"),
                  (this.athendication = n),
                  console.log(n);
              });
            }
            superADminLogout() {
              this.http
                .get("http://localhost:5000/superadmin/logoutSuperAdmin", {
                  withCredentials: !0,
                })
                .subscribe(
                  () => {
                    Un.Emitter.emit(!1),
                      localStorage.removeItem("isLoggedIN"),
                      localStorage.removeItem("superadmin"),
                      this.router.navigate(["/login"]);
                  },
                  (n) => console.log(n)
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(bo), _($e));
            }),
            (e.ɵcmp = un({
              type: e,
              selectors: [["app-navbar"]],
              decls: 10,
              vars: 2,
              consts: [
                [1, "navbar", "navbar-expand-lg", "navbar-light", "bg-light"],
                ["routerLink", "/", 1, "navbar-brand"],
                [
                  "type",
                  "button",
                  "data-toggle",
                  "collapse",
                  "data-target",
                  "#navbarNav",
                  "aria-controls",
                  "navbarNav",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-icon"],
                ["id", "navbarNav", 1, "collapse", "navbar-collapse"],
                ["class", "navbar-nav ms-auto", 4, "ngIf"],
                [1, "navbar-nav", "ms-auto"],
                [1, "nav-item", "mx-auto"],
                ["class", "nav-link ", 3, "click", 4, "ngIf"],
                [1, "nav-item", "active"],
                ["routerLink", "/login", 1, "nav-link"],
                [1, "nav-item"],
                ["routerLink", "/initaillogin", 1, "nav-link"],
                [1, "nav-link", 3, "click"],
              ],
              template: function (n, r) {
                1 & n &&
                  (E(0, "nav", 0)(1, "a", 1),
                  R(2, "Turfyo"),
                  D(),
                  E(3, "button", 2),
                  de(4, "span", 3),
                  D(),
                  E(5, "div", 4),
                  L(6, _8, 7, 0, "ul", 5),
                  E(7, "ul", 6)(8, "li", 7),
                  L(9, D8, 2, 0, "a", 8),
                  D()()()()),
                  2 & n &&
                    (I(6),
                    P("ngIf", !r.athendication),
                    I(3),
                    P("ngIf", r.athendication));
              },
              dependencies: [lr, Ju],
              styles: [
                ".navbar-brand[_ngcontent-%COMP%]{font-size:30px;font-weight:600;color:#660101}",
              ],
            })),
            e
          );
        })(),
        w8 = (() => {
          class e {
            constructor() {
              this.title = "super-admin-app";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = un({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              consts: [[1, "foem-sign"]],
              template: function (n, r) {
                1 & n &&
                  (de(0, "app-navbar"),
                  E(1, "main", 0),
                  de(2, "router-outlet"),
                  D());
              },
              dependencies: [pg, C8],
            })),
            e
          );
        })();
      const E8 = C0(
        [],
        D0(XM, (e, { restaurantData: t }) => (console.log(t), [...t]))
      );
      function b8(e, t) {
        return E8(e, t);
      }
      const S8 = C0(
          {
            _id: "",
            name: "",
            place: "",
            owner_name: "",
            owner_email: "",
            password: "",
            owner_number: "",
            poc_doc: "",
            registration_data: "",
            registration_id: "",
            restaurant_no: "",
            license: "",
            status,
          },
          D0(JM, (e, { allRestaurantData: t }) => (console.log(t), t))
        ),
        M8 = (e, t) => S8(e, t);
      let T8 = (() => {
          class e {
            constructor(n, r) {
              (this.actions$ = n),
                (this.service = r),
                (this.projectAllRestaurant$ = S0(() =>
                  this.actions$.pipe(
                    A0(YM),
                    Vt(() =>
                      this.service
                        .getAllRestaurantsData()
                        .pipe(te((i) => XM({ restaurantData: i })))
                    )
                  )
                )),
                (this.projectFullDetailsOfRes$ = S0(() =>
                  this.actions$.pipe(
                    A0(dc),
                    Vt(
                      (i) => (
                        console.log(i.id),
                        this.service
                          .fullDetails(i.id)
                          .pipe(te((o) => JM({ allRestaurantData: o })))
                      )
                    )
                  )
                ));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(w(AB), w(gi));
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        I8 = (() => {
          class e {
            constructor() {}
            intercept(n, r) {
              const i = localStorage.getItem("superadmin");
              console.log(i);
              const o = n.clone({
                setHeaders: { Authorization: `Bearer ${i}` },
              });
              return r.handle(o);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = O({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        A8 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = xe({ type: e, bootstrap: [w8] })),
            (e.ɵinj = Ae({
              providers: [
                gi,
                qg,
                vT,
                { provide: lT, useClass: I8, multi: !0 },
                {
                  provide: "SocialAuthServiceConfig",
                  useValue: {
                    autoLogin: !1,
                    providers: [
                      {
                        id: pa.PROVIDER_ID,
                        provider: new pa(
                          "373314217149-ks6armu585104gmhg10drdk1odl70s3n.apps.googleusercontent.com"
                        ),
                      },
                    ],
                    onError: (t) => {
                      console.error(t);
                    },
                  },
                },
              ],
              imports: [
                GE,
                v8,
                Lz,
                aU,
                pz,
                hz,
                _B.forRoot({ restaurantData: b8, allRestaurantData: M8 }),
                qB.forRoot([T8]),
                j5,
                B5,
                d8.forRoot({
                  positionClass: "toast-top-center",
                  preventDuplicates: !0,
                }),
              ],
            })),
            e
          );
        })();
      r2()
        .bootstrapModule(A8)
        .catch((e) => console.error(e));
    },
  },
  (he) => {
    he((he.s = 552));
  },
]);
