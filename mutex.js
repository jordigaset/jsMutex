/**
 * MUTEX
 * @version v0.0.1
 * @author Jordi Gaset
 *
 * Developed under the sponsorship of IdeaKnow
 *
 *
 * Usage:
 *
 *	Creation of mutex
 *		var myMutex = new __MUTEX(myObjectThatMakesTasks, "myMethosOfObjectThatMakesTasks", debug);
 *
 *	Start a task
 *		myMutex.start(objectToPassToMethod);
 *
 *	When task is finished:
 *		myMutex.done();
 */
__MUTEX = function(/*object*/ _actionObject, /*String*/ _actionMethod, /*Bool*/ _debug){
		this.working = false;
		this.workQueue = [];
		this.actionObject = _actionObject;
		this.actionMethod = _actionMethod;
		this.debug=_debug;
	};

	__MUTEX.prototype = {
		/**
		 * Start a newTask
		 * if Mutex is active, queue the task for later
		 * actionParam: Object passed to the actionObject.actionMethod
		 */
		start: function(/*object*/ actionParam){
			if (this.working) {
				if (this.debug) console.log(new Date().getTime() + " MUTEX Busy, pushing " + this.actionMethod + "(" + actionParam + ")");
				this.workQueue.push(actionParam);
			} else {
				if (this.debug) console.log(new Date().getTime() + " MUTEX Idle, executing " + this.actionMethod + "(" + actionParam + ")");
				this.working = true;
				this.actionObject[this.actionMethod](actionParam);
			}
		},

		/**
		 * Task Done event
		 *
		 * when finishing a task, this function must be called in order to continue with enqueued tasks
		 */
		done: function() {
			if (this.workQueue.length > 0) {
				var actionParam = this.workQueue.shift();
				if (this.debug) console.log(new Date().getTime() + " MUTEX Released, executing next action " + this.actionMethod + "(" + actionParam + ")");
				this.actionObject[this.actionMethod](actionParam);
			}else {
				if (this.debug) console.log(new Date().getTime() + " MUTEX Released");
				this.working = false;
			}

		}
	};