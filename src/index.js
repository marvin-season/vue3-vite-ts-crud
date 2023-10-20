function func1() {
  try {
    throw new Error("Error from func1");
    console.log("===========", 1);
  } catch (error) {
    console.log("func1 => ", error.message);
    throw error;
  }
}

function func2() {
  try {
    func1();
    console.log("===========", 2);
  } catch (error) {
    console.log("func2", error.message);
  }
  console.log("+++++++++++++", "func2");
}

// func2();

async function func3() {
  try {
    throw new Error("Error from func3");
    console.log("===========", 1);
  } catch (error) {
    console.log("func3 => ", error.message);
    throw error;
  }
}

async function func4() {
  try {
    await func3();
    console.log("===========", 4);
  } catch (error) {
    console.log("func4 => ", error.message);
  }
  console.log("+++++++++++++", "func4");
}

func4();
