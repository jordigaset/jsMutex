jsMutex
=======

A simple javascript Mutex to queue tasks that can not run in parallel.

The mutex executes a task if mutex is Idle, and queue it if the mutext is busy. When a task is finished, start the next one.

## Usage


Creation of Mutex
```js
var myMutex = new __MUTEX(myObjectThatMakesTasks, "myMethodOfObjectThatMakesTasks", debug);
```

Start a Task
```js
myMutex.start(objectToPassToMethod);
```

Release Mutex
```js
myMutex.done();
```