// task 1
const normalizeData = (content) => {
    const [, ...data] = content.split('\n');
    data.pop();
    return data.map((item) => item.split(';'));
  };
  
  const getRatings = (data) => {
    const ratingsGP = data.map((item) => Number(item[2]));
    const ratingsAS = data.map((item) => Number(item[3]));
    const ratingGP = Math.max(...data.map((item) => Number(item[2])));
    const ratingAppStore = Math.max(...data.map((item) => Number(item[3])));
    const topMes = data[ratingsGP.indexOf(ratingGP)][0];
    const owner = data[ratingsAS.indexOf(ratingAppStore)][1];
    return [topMes, owner];
  };
  
  const getDlIndia = (data) => {
    const maxDlIndia = Math.max(...data.map((item) => Number(item[6])));
    const minDlIndia = Math.min(...data.map((item) => Number(item[6])));
    return [maxDlIndia, minDlIndia];
  };
  
  const getPopAust = (data) => {
    const sortDlAustr = data.map((item) => Number(item[5])).sort((a, b) => b - a);
    const downloadAust = data.map((item) => Number(item[5]));
    const sortedTop3 = [
      data[downloadAust.indexOf(sortDlAustr[0])][0],
      data[downloadAust.indexOf(sortDlAustr[1])][0],
      data[downloadAust.indexOf(sortDlAustr[2])][0],
    ];
    return sortedTop3.sort();
  };
  
  const numberOfDownload = (data) => {
    const averNumberOfDl = data.reduce((acc, item) => {
      const count = (Number(item[4]) + Number(item[5]) + Number(item[6]) + Number(item[7])) / 4;
      acc.push(count);
      return acc;
    }, []);
    const averNumberName = averNumberOfDl.reduce((acc, item) => {
      const nameApp = data[averNumberOfDl.indexOf(item)][0];
      acc.push([item, nameApp]);
      return acc;
    }, []);
    averNumberOfDl.sort((a, b) => a - b);
    const namesAverDl = averNumberOfDl.reduce((acc, item) => {
      const nameApp = averNumberName.filter((num) => num[0] === item);
      acc.push(nameApp[0][1]);
      return acc;
    }, []);

    return namesAverDl.join(', ');
  };
  
  const topOwner = (data) => {
    const owners = data.reduce((acc, item) => {
      const owner = item[1];
      if (!Object.hasOwn(acc, owner)) {
        acc[owner] = 0;
      }
      acc[owner] += 1;
      return acc;
    }, {});

    const ownersFilt = Object.entries(owners).filter((item) => item[1] >= 2);
    const topOwners = ownersFilt.map((item) => item[0]).join(', ');
    return topOwners;
  };
  
  const tableParsing = (content) => {
    const data = normalizeData(content);
  
    // task 1 
    const [topMes, owner] = getRatings(data);
    console.log(`General top messenger: ${topMes}, Owner: ${owner}`);
  
    const [maxDlIndia, minDlIndia] = getDlIndia(data);
    console.log(`Download count: Max count: ${maxDlIndia}, Min count: ${minDlIndia}`);
  
    const [top1, top2, top3] = getPopAust(data);
    console.log(`Top-3 Australia: ${top1}, ${top2}, ${top3}`);
  
    const names = numberOfDownload(data);
    console.log(`Top downloads: ${names}`);
  
    const owners = topOwner(data);
    console.log(`Top owner: ${owners}`);
  };
  
  // task 2
  
  const normalizeDataJob = (content) => {
    const data = content.split('\n');
    return data.map((item) => item.split(','));
  };
  
  const getNameSurname = (data) => {
    const [name, post] = [data[0], data[1]];
    return [name, post];
  };
  
  const frames = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];
  
  const getFrames = (data) => {
    const framesToLower = frames.map((item) => item.trim().toLowerCase());
    const framesNospace = data[5].map((item) => item.trim().toLowerCase());

    const listFrames = framesNospace.filter((item) => framesToLower.includes(item));
    return listFrames.length;
  };
  
  const getGitName = (data) => {
    const socials = data[4].join(',').split(':')[1].split(',').map((item) => item.trim());
    const linkName = socials.map((item) => item.split('.')).filter((item) => item[0] === 'github').flat();
    const name = linkName[1].split('/')[1];
    return name;
  };
  
  const candidateAssessment = (content) => {
    const data = normalizeDataJob(content);
  
    const [name, post] = getNameSurname(data);
    console.log(`Job seeker: ${name[0]}, ${post[0]}`);

    const numOfFrames = getFrames(data);
    console.log(`Required stack: ${numOfFrames}`);
  
    const nickName = getGitName(data);
    console.log(`GitHub nickname: ${nickName}`);
  };
  
  // task 3
  const actorRating = (/* content */) => {
  
  };
  
  export { tableParsing, candidateAssessment, actorRating };